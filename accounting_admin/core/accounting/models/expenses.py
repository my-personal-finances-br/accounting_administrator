import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from accounting_admin.utils.default_model import Default

User = get_user_model()

class Expense(Default):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        serialize=False,
        editable=False,
        unique=True,
    )
    value = models.DecimalField(_("value"), max_digits=24, decimal_places=6)
    name = models.CharField(
        _("name"),
        max_length=72,
    )
    description = models.CharField(
        _("description"),
        max_length=144,
    )
    expected_paid = models.OneToOneField(
        "accounting.Expense",
        verbose_name=_("expected paid"),
        related_name=_("paid"),
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    monthly_expense = models.ForeignKey(
        "accounting.MonthlyExpense",
        verbose_name=_("monthly expense"),
        related_name=_("expenses"),
        on_delete=models.CASCADE,
    )
    is_fixed = models.BooleanField(_("is fixed"), default=False)
    user = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name=_("expenses"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Expense")
        verbose_name_plural = _("Expenses")

    def __str__(self):
        return f"{self.name}"