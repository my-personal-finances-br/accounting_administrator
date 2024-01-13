from django.contrib import admin

from accounting_admin.core.expense.models import ExpectedExpense, Expense, MonthlyExpense


@admin.register(Expense)
class ClassExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value", "paid_value", "credit_card"]
    list_filter = ["monthly_expense", "credit_card"]


@admin.register(ExpectedExpense)
class ClassExpectedExpenseAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "value", "deadline_type", "deadline"]
    list_filter = ["deadline_type", "user"]


@admin.register(MonthlyExpense)
class ClassMonthlyExpenseAdmin(admin.ModelAdmin):
    list_display = [
        "uuid",
        "month",
        "total",
        "month_year",
        "month_number",
        "created_at",
        "user",
    ]
    list_filter = ["month", "user"]
