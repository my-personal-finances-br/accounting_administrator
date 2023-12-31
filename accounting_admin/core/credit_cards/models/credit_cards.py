import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


class CreditCard(Default):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        serialize=False,
        editable=False,
        unique=True,
    )
    name = models.CharField(
        _("name"),
        max_length=72,
    )
    bank = models.ForeignKey(
        "banks.Bank",
        verbose_name=_("bank"),
        related_name=_("banks"),
        on_delete=models.CASCADE,
    )
    deadline = models.DateTimeField()
    user = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name=_("credit_cards"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Credit Card")
        verbose_name_plural = _("Credit Cards")

    def __str__(self):
        return f"{self.name}"
