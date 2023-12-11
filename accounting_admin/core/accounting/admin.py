from django.contrib import admin

from accounting_admin.core.accounting.models import (
    ExpectedExpense,
    Expense,
    MonthlyExpense,
    Salary,
)


@admin.register(Expense)
class ClassExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value", "is_fixed", "paid_value"]
    list_filter = ["name", "monthly_expense", "is_fixed"]


@admin.register(ExpectedExpense)
class ClassExpectedExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value"]
    list_filter = ["name"]


@admin.register(MonthlyExpense)
class ClassMonthlyExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "month", "total"]
    list_filter = ["month", "user"]


@admin.register(Salary)
class ClassMonthlyExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "gross", "user"]
    list_filter = ["user"]
