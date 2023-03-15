import uuid

from django.contrib.auth import get_user_model
from django.db import models
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
    total = models.DecimalField(_("total"), max_digits=24, decimal_places=6, blank=True, null=True)
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
        return f"{self.month} - {self.total}"
    
    def save(self, skip_checks=False, *args, **kwargs):
        if skip_checks:
            return super().save(*args, **kwargs)
        from accounting_admin.core.accounting.models import ExpectedExpense
        super().save(*args, **kwargs)
        
        expected_expenses = ExpectedExpense.objects.filter(user=self.user, is_fixed=True).distinct("value", "name", "description")
        new_expected_expenses = []
        for expected_expense in expected_expenses:
            new_expected_expenses.append(
                ExpectedExpense(
                    value=expected_expense.value,
                    name=expected_expense.name,
                    description=expected_expense.description,
                    monthly_expected_expense_id=self.uuid,
                    user_id=self.user_id
                )
            )
        ExpectedExpense.objects.bulk_create(new_expected_expenses)