from django.apps import apps
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _


from accounting_admin.core.users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "has_changed_password",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ["username", "is_staff", "is_superuser"]


for app_config in apps.get_app_configs():
    for model in app_config.get_models():
        if admin.site.is_registered(model) and model.__name__ != "User":
            admin.site.unregister(model)