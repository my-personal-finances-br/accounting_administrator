from django.contrib import admin

from accounting_admin.core.salary.models import ExpectedSalary, Salary


@admin.register(Salary)
class ClassSalaryAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "gross", "account"]
    list_filter = ["account"]


@admin.register(ExpectedSalary)
class ClassExpectedSalaryAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "gross", "account"]
    list_filter = ["account"]
