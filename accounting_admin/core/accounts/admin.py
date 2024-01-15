from django.contrib import admin

from accounting_admin.core.accounts.models import Account, AccountSubscriber


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ["uuid", "total", "bank"]
    list_filter = ["bank"]


@admin.register(AccountSubscriber)
class AccountAdmin(admin.ModelAdmin):
    list_display = ["account", "user"]
    list_filter = ["user"]
