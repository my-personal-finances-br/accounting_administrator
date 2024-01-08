import calendar
import uuid
from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


def define_deadline(expected_salary, month_number):
    from accounting_admin.core.holidays.models import Holiday

    current_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    next_month = month_number + 1
    next_year = current_date.year if next_month != 12 else current_date.year + 1

    if expected_salary.deadline_type == "first_business_day":
        first_day_next_month = current_date.replace(
            day=1, month=next_month, year=next_year
        )

        holiday_days = Holiday.objects.filter(
            Q(date__year=first_day_next_month.year)
            & Q(date__month=first_day_next_month.month)
        ).values_list("date__day", flat=True)

        while (
            first_day_next_month.weekday() in [5, 6]
            or first_day_next_month.day in holiday_days
        ):
            first_day_next_month += timedelta(days=1)

        return first_day_next_month

    elif expected_salary.deadline_type == "last_business_day":
        _, last_day_of_month = calendar.monthrange(next_year, next_month)

        last_day = current_date.replace(
            day=last_day_of_month, month=next_month, year=next_year
        )

        holiday_days = Holiday.objects.filter(
            Q(date__year=last_day.year) & Q(date__month=last_day.month)
        ).values_list("date__day", flat=True)

        while last_day.weekday() in [5, 6] or last_day.day in holiday_days:
            last_day -= timedelta(days=1)

        return last_day
    else:
        return current_date.replace(
            day=expected_salary.deadline, month=next_month, year=next_year
        )


def define_name(expected_salary):
    if not expected_salary.exists_until:
        return expected_salary.name

    current_date = datetime.now()

    total_months = (
        expected_salary.exists_until.year - expected_salary.created_at.year
    ) * 12 + (expected_salary.exists_until.month - expected_salary.created_at.month)

    remaining_months = (expected_salary.exists_until.year - current_date.year) * 12 + (
        expected_salary.exists_until.month - current_date.month
    )

    return f"Parcela {total_months - remaining_months + 1}/{total_months}: {expected_salary.name}"


class MonthlyExpense(Default):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        serialize=False,
        editable=False,
        unique=True,
    )
    month = models.CharField(
        _("month"),
        max_length=72,
    )
    month_number = models.IntegerField(_("month_number"))
    month_year = models.IntegerField(_("month_year"), blank=True, null=True)
    total = models.DecimalField(
        _("total"), max_digits=24, decimal_places=6, blank=True, null=True
    )
    detail = models.TextField(_("detail"), blank=True, null=True)
    user = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name=_("monthly_expenses"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Monthly Expense")
        verbose_name_plural = _("Monthly Expenses")

    def __str__(self):
        return f"{self.month}, {self.month_year} - {self.user}"

    def save(self, skip_checks=False, *args, **kwargs):
        if skip_checks:
            return super().save(*args, **kwargs)
        from accounting_admin.core.expense.models import ExpectedExpense, Expense
        from accounting_admin.core.salary.models import ExpectedSalary, Salary

        super().save(*args, **kwargs)

        if not self.expenses.count():
            now = datetime.now()
            expected_expenses = ExpectedExpense.objects.filter(user=self.user)
            expected_salaries = ExpectedSalary.objects.filter(user=self.user)

            new_expected_expenses = []
            new_expected_salaries = []

            for expected_salary in expected_salaries:
                new_expected_salaries.append(
                    Salary(
                        name=expected_salary.name,
                        net=expected_salary.net,
                        gross=expected_salary.gross,
                        monthly_id=self.uuid,
                        user_id=self.user_id,
                        try_to_save=expected_salary.try_to_save,
                    )
                )

            for expected_expense in expected_expenses:
                new_expected_expenses.append(
                    Expense(
                        value=expected_expense.value,
                        name=define_name(expected_expense),
                        description=expected_expense.description,
                        monthly_expense_id=self.uuid,
                        user_id=self.user_id,
                        deadline=define_deadline(expected_expense, self.month_number),
                        credit_card_id=expected_expense.credit_card_id,
                    )
                )
            Expense.objects.bulk_create(new_expected_expenses)
            Salary.objects.bulk_create(new_expected_salaries)
            ExpectedExpense.objects.filter(
                Q(
                    Q(exists_until__month=now.month) & Q(exists_until__year=now.year)
                    | Q(exists_until__lt=now)
                )
            ).delete()

    def closure(self):
        if self.detail:
            return
        detail = ""
        self.total = self.parcial_total
        for expense in self.expenses.all():
            detail += f"<p>{expense.name} ------------------- {expense.value}</p></br>"
        detail += "<p>--------------------------------------------</p></br>"
        detail += f"<p>Total a ser pago:               {self.total}</p></br>"
        detail += f"<p>Entradas do mês:                 {self.salary_total}</p></br>"
        detail += f"<p>Faltou pagar:                   {self.to_pay}</p></br>"
        detail += f"<p>Total guardado:                 {self.try_to_save}</p></br>"
        self.detail = detail
        self.save()

    @property
    def parcial_total(self):
        paid_value = sum(
            self.expenses.filter(paid_value__isnull=False)
            .distinct("uuid")
            .values_list("paid_value", flat=True)
        )
        return paid_value + self.to_pay

    @property
    def to_pay(self):
        return sum(
            self.expenses.filter(paid_value__isnull=True)
            .distinct("uuid")
            .values_list("value", flat=True)
        )

    @property
    def salary_total(self):
        return sum(self.salaries.distinct("uuid").values_list("net", flat=True))

    @property
    def try_to_save(self):
        return sum(self.salaries.distinct("uuid").values_list("try_to_save", flat=True))

    @property
    def salary_left(self):
        return self.salary_total - self.parcial_total - self.try_to_save

    @property
    def paid(self):
        return sum(
            self.expenses.filter(paid_value__isnull=False)
            .distinct("uuid")
            .values_list("paid_value", flat=True)
        )
