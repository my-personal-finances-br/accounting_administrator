from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    has_changed_password = models.BooleanField(_("has changed password"), default=False)

    def __str__(self):
        return f"{self.full_name}"

    @property
    def full_name(self):
        return self.get_full_name() or self.username
