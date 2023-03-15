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