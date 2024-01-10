import uuid

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
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
    exists_until = models.DateField(blank=True, null=True)
    credit_card = models.ForeignKey(
        "credit_cards.CreditCard",
        verbose_name=_("credit card"),
        related_name=_("expected_expenses"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("Expected Expense")
        verbose_name_plural = _("Expected Expenses")

    def __str__(self):
        return f"{self.name}"

    def save(self, skip_checks=False, *args, **kwargs):
        if skip_checks:
            return super().save(*args, **kwargs)

        if not self.deadline_type == "date" and self.deadline:
            raise ValidationError(
                f"Você selecionou {self.deadline_type} e por isso não precisa preencher o campo 'deadline'."
            )
        if self.deadline_type == "date" and not self.deadline:
            raise ValidationError(
                f"Você selecionou {self.deadline_type} e por isso  precisa preencher o campo 'deadline'."
            )
        return super().save(*args, **kwargs)
