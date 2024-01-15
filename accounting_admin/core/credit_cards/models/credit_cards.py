import uuid

from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


class CreditCard(Default):
    name = models.CharField(
        _("name"),
        max_length=72,
    )
    bank = models.ForeignKey(
        "banks.Bank",
        verbose_name=_("bank"),
        related_name=_("credit_cards"),
        on_delete=models.CASCADE,
    )
    deadline = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(31)], blank=True, null=True
    )
    closure = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(31)], blank=True, null=True
    )
    account = models.ForeignKey(
        "accounts.Account",
        verbose_name=_("account"),
        related_name=_("credit_cards"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Credit Card")
        verbose_name_plural = _("Credit Cards")

    def __str__(self):
        return f"{self.bank.name} - {self.name} - {self.user.username}"
