from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default


class ExpectedSalary(Default):
    gross = models.DecimalField(
        _("gross salary"), max_digits=24, decimal_places=6, default=0
    )
    net = models.DecimalField(_("net salary"), max_digits=24, decimal_places=6, default=0)
    name = models.CharField(
        _("name"),
        max_length=72,
    )
    try_to_save = models.DecimalField(
        _("try to save"), max_digits=24, decimal_places=6, default=0
    )
    account = models.ForeignKey(
        "accounts.Account",
        verbose_name=_("account"),
        related_name=_("expected_salaries"),
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Expected Salary")
        verbose_name_plural = _("Expected Salaries")

    def __str__(self):
        return f"{self.name}"
