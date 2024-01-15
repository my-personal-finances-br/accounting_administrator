from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


class Account(Default):
    total = models.DecimalField(
        _("total"), max_digits=24, decimal_places=6, default=0
    )
    bank = models.ForeignKey(
        "banks.Bank",
        verbose_name=_("bank"),
        related_name=_("accounts"),
        on_delete=models.SET_NULL,
        null=True
    )
    user = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name=_("accounts"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Account")
        verbose_name_plural = _("Accounts")

    def __str__(self):
        return f"{self.name}"
