from django.contrib import admin

from accounting_admin.core.holidays.models import Holiday


@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    list_display = ["uuid", "name", "date"]
    list_filter = [
        "name",
        "date",
    ]
