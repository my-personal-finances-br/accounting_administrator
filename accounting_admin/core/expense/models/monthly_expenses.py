import calendar
from datetime import datetime, timedelta

from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default


def define_deadline(expected_salary, month_number):
    if expected_salary.deadline_type == "date" and not expected_salary.deadline:
        return
    current_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    next_month = month_number + 1
    next_year = current_date.year if next_month != 12 else current_date.year + 1

    if expected_salary.deadline_type == "first_business_day":
        return calculate_nth_business_day(1, next_year, next_month, current_date)

    elif expected_salary.deadline_type == "fifth_business_day":
        return calculate_nth_business_day(5, next_year, next_month, current_date)

    elif expected_salary.deadline_type == "fifteenth_business_day":
        return calculate_nth_business_day(15, next_year, next_month, current_date)

    elif expected_salary.deadline_type == "last_business_day":
        _, last_day_of_month = calendar.monthrange(next_year, next_month)

        last_day = current_date.replace(
            day=last_day_of_month, month=next_month, year=next_year
        )

        holiday_days = get_holiday_days(last_day.year, last_day.month)

        while last_day.weekday() in [5, 6] or last_day.day in holiday_days:
            last_day -= timedelta(days=1)

        return last_day
    else:
        return current_date.replace(
            day=expected_salary.deadline, month=next_month, year=next_year
        )


def calculate_nth_business_day(n, next_year, next_month, current_date):
    count = 0
    current_day = current_date.replace(day=1, month=next_month, year=next_year)
    holiday_days = get_holiday_days(next_year, next_month)

    while count < n:
        if (
            current_day.weekday() not in [5, 6]
            and current_day.day not in holiday_days
            and current_day.month == next_month
        ):
            count += 1

        if count < n:
            current_day += timedelta(days=1)

    return current_day


def get_holiday_days(year, month):
    from accounting_admin.core.holidays.models import Holiday

    return Holiday.objects.filter(Q(date__year=year) & Q(date__month=month)).values_list(
        "date__day", flat=True
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
    account = models.ForeignKey(
        "accounts.Account",
        verbose_name=_("account"),
        related_name=_("monthly_expenses"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Monthly Expense")
        verbose_name_plural = _("Monthly Expenses")

    def __str__(self):
        return f"{self.month}, {self.month_year} - {self.account}"

    def save(self, skip_checks=False, *args, **kwargs):
        if skip_checks:
            return super().save(*args, **kwargs)
        from accounting_admin.core.expense.models import ExpectedExpense, Expense
        from accounting_admin.core.salary.models import ExpectedSalary, Salary

        super().save(*args, **kwargs)

        if not self.expenses.count():
            now = datetime.now()
            expected_expenses = ExpectedExpense.objects.filter(
                account_id=self.account.uuid
            )
            expected_salaries = ExpectedSalary.objects.filter(
                account_id=self.account.uuid
            )

            new_expected_expenses = []
            new_expected_salaries = []

            for expected_salary in expected_salaries:
                new_expected_salaries.append(
                    Salary(
                        name=expected_salary.name,
                        net=expected_salary.net,
                        gross=expected_salary.gross,
                        monthly_id=self.uuid,
                        account_id=self.account.uuid,
                        try_to_save=expected_salary.try_to_save,
                        deadline=define_deadline(expected_salary, self.month_number),
                    )
                )

            for expected_expense in expected_expenses:
                new_expected_expenses.append(
                    Expense(
                        value=expected_expense.value,
                        name=define_name(expected_expense),
                        description=expected_expense.description,
                        monthly_expense_id=self.uuid,
                        account_id=self.account.uuid,
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
