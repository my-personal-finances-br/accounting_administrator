from django.contrib import admin

from accounting_admin.core.expense.models import ExpectedExpense, Expense, MonthlyExpense


@admin.register(Expense)
class ClassExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value", "paid_value"]
    list_filter = [
        "name",
        "monthly_expense",
    ]


@admin.register(ExpectedExpense)
class ClassExpectedExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value"]
    list_filter = ["name"]


@admin.register(MonthlyExpense)
class ClassMonthlyExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "month", "total"]
    list_filter = ["month", "user"]
