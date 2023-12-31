from django.contrib import admin

from accounting_admin.core.banks.models import Bank


@admin.register(Bank)
class ClassExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name"]
    list_filter = [
        "name",
    ]
