import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

from accounting_admin.utils.default_model import Default


class Holiday(Default):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        serialize=False,
        editable=False,
        unique=True,
    )
    name = models.CharField(max_length=72)
    date = models.DateTimeField()

    class Meta:
        verbose_name = _("Holiday")
        verbose_name_plural = _("Holidays")
