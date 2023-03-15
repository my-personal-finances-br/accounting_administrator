
from rest_framework import serializers

from accounting_admin.core.accounting.models import Expense


class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = "__all__"