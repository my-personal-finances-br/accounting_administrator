import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


class ExpectedExpense(Default):
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
    user = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name=_("expected_expenses"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Expected Expense")
        verbose_name_plural = _("Expected Expenses")

    def __str__(self):
        return f"{self.name}"
