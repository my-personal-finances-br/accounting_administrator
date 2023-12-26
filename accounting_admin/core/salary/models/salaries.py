import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


class Salary(Default):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        serialize=False,
        editable=False,
        unique=True,
    )
    monthly = models.ForeignKey(
        "expense.MonthlyExpense",
        verbose_name=_("monthly expense"),
        related_name=_("salaries"),
        on_delete=models.CASCADE,
    )
    gross = models.DecimalField(
        _("gross salary"), max_digits=24, decimal_places=6, default=0
    )
    net = models.DecimalField(
        _("net salary"), max_digits=24, decimal_places=6, default=0
    )
    name = models.CharField(
        _("name"),
        max_length=72,
    )
    user = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name=_("salaries"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Salary")
        verbose_name_plural = _("Salaries")

    def __str__(self):
        return f"{self.name}"
