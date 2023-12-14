from django.contrib import admin

from accounting_admin.core.salary.models import ExpectedSalary, Salary


@admin.register(Salary)
class ClassSalaryAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "gross", "user"]
    list_filter = ["user"]


@admin.register(ExpectedSalary)
class ClassExpectedSalaryAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "gross", "user"]
    list_filter = ["user"]
