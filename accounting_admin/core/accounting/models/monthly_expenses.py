import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


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
        return f"{self.month}, {self.created_at.year} - {self.user}"

    def save(self, skip_checks=False, *args, **kwargs):
        if skip_checks:
            return super().save(*args, **kwargs)
        from accounting_admin.core.accounting.models import ExpectedExpense, Expense

        super().save(*args, **kwargs)

        if not self.expenses.count():
            expected_expenses = ExpectedExpense.objects.filter(user=self.user)
            new_expected_expenses = []
            for expected_expense in expected_expenses:
                new_expected_expenses.append(
                    Expense(
                        is_fixed=True,
                        value=expected_expense.value,
                        name=expected_expense.name,
                        description=expected_expense.description,
                        monthly_expense_id=self.uuid,
                        user_id=self.user_id,
                    )
                )
            Expense.objects.bulk_create(new_expected_expenses)

    def closure(self):
        if self.detail:
            return
        detail = ""
        self.total = self.parcial_total
        for expense in self.expenses.all():
            detail += f"<p>{expense.name} ------------------- {expense.value}</p></br>"
        detail += f"<p>--------------------------------------------</p></br>"
        detail += f"<p>Total a ser pago:               {self.total}</p></br>"
        detail += f"<p>Salario do mês:                 {self.salary_total}</p></br>"
        detail += f"<p>Faltou pagar:                   {self.to_pay}</p></br>"
        detail += f"<p>Total guardado:                 {self.try_to_save}</p></br>"
        self.detail = detail
        self.save()

    @property
    def parcial_total(self):
        paid_value = sum(
            self.expenses.filter(paid_value__isnull=False).values_list(
                "paid_value", flat=True
            )
        )
        return paid_value + self.to_pay

    @property
    def to_pay(self):
        return sum(
            self.expenses.filter(paid_value__isnull=True)
            .distinct()
            .values_list("value", flat=True)
        )

    @property
    def salary_total(self):
        return sum(self.user.salaries.values_list("net", flat=True))

    @property
    def try_to_save(self):
        return self.salary_total - self.parcial_total

    @property
    def paid(self):
        return sum(
            self.expenses.filter(paid_value__isnull=False)
            .distinct()
            .values_list("paid_value", flat=True)
        )
