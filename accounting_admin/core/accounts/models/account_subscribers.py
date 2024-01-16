from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default

User = get_user_model()


class AccountSubscriber(Default):
    account = models.ForeignKey(
        "accounts.Account",
        verbose_name=_("bank"),
        related_name=_("subscribers"),
        on_delete=models.CASCADE,
        null=True,
    )
    user = models.ForeignKey(
        User,
        verbose_name=_("user"),
        related_name=_("accounts"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Account Subscriber")
        verbose_name_plural = _("Account Subscribers")

    def __str__(self):
        return f"{self.account} {self.user.full_name}"
