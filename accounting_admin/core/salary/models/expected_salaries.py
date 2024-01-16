from django.core.validators import MaxValueValidator, MinValueValidator
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
    deadline = models.IntegerField(
        blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(31)]
    )
    deadline_type = models.CharField(
        choices=[
            ("first_business_day", "Primeiro dia útil"),
            ("last_business_day", "Ultimo dia útil"),
            ("fifth_business_day", "5° dia útil"),
            ("fifteenth_business_day", "15° dia útil"),
            ("date", "Data exata"),
        ],
        max_length=100,
        default="date",
    )

    class Meta:
        verbose_name = _("Expected Salary")
        verbose_name_plural = _("Expected Salaries")

    def __str__(self):
        return f"{self.name}"
