from django.contrib import admin

from accounting_admin.core.credit_cards.models import CreditCard


@admin.register(CreditCard)
class ClassExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "bank", "deadline", "user"]
    list_filter = ["name", "bank", "deadline", "user"]
