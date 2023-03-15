
from rest_framework import serializers

from accounting_admin.core.accounting.models import Expense, ExpectedExpense


class ExpensesSerializer(serializers.ModelSerializer):
    expense = serializers.ReadOnlyField(source="expenses")
    
    class Meta:
        model = ExpectedExpense
        exclude = ["user"]
        
    def create(self, data):
        data["user"] = self.context.get("request").user
        return super().create(data)