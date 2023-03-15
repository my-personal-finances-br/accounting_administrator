from django.contrib import admin
from accounting_admin.core.accounting.models import Expense

@admin.register(Expense)
class ClassShiftAdmin(admin.ModelAdmin):
    list_display = ["name"]
    list_filter = ["name"]