from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default


class Expense(Default):
    value = models.DecimalField(_("value"), max_digits=24, decimal_places=6)
    paid_value = models.DecimalField(
        _("paid value"), max_digits=24, decimal_places=6, null=True, blank=True
    )
    name = models.CharField(
        _("name"),
        max_length=72,
    )
    description = models.CharField(
        _("description"),
        max_length=144,
    )
    monthly_expense = models.ForeignKey(
        "expense.MonthlyExpense",
        verbose_name=_("monthly expense"),
        related_name=_("expenses"),
        on_delete=models.CASCADE,
    )
    credit_card = models.ForeignKey(
        "credit_cards.CreditCard",
        verbose_name=_("credit card"),
        related_name=_("expenses"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    account = models.ForeignKey(
        "accounts.Account",
        verbose_name=_("account"),
        related_name=_("expenses"),
        on_delete=models.CASCADE,
    )
    deadline = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = _("Expense")
        verbose_name_plural = _("Expenses")

    def __str__(self):
        return f"{self.name}"

    @property
    def paid(self):
        return bool(self.paid_value)
