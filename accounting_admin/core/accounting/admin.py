from django.contrib import admin

from accounting_admin.core.accounting.models import (
    ExpectedExpense,
    Expense,
    MonthlyExpense,
)


@admin.register(Expense)
class ClassExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value", "is_fixed", "expected_paid"]
    list_filter = ["name"]


@admin.register(ExpectedExpense)
class ClassExpectedExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value"]
    list_filter = ["name"]


@admin.register(MonthlyExpense)
class ClassMonthlyExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "month", "total"]
    list_filter = ["month"]
