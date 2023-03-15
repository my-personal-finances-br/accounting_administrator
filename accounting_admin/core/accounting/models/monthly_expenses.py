import uuid
from django.db.models import Q
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
        return f"{self.month}, {self.created_at.year} - {self.total}"
    
    def save(self, skip_checks=False, *args, **kwargs):
        if skip_checks:
            return super().save(*args, **kwargs)
        from accounting_admin.core.accounting.models import ExpectedExpense, Expense
        super().save(*args, **kwargs)
        
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
                    user_id=self.user_id
                )
            )
        Expense.objects.bulk_create(new_expected_expenses)


    def closure(self):
        detail = ""
        expenses = self.expenses.exclude(Q(expected_paid__isnull=True, is_fixed=True) | Q(expected_paid__isnull=False, is_fixed=True))
        self.total = sum(expenses.values_list("value", flat=True))
        for expense in expenses:
            detail += f"<p>{expense.name} ------------------- {expense.value}</p></br>"
        detail += f"<p>Total:                   {self.total}</p>"
        self.detail = detail
        self.save()
