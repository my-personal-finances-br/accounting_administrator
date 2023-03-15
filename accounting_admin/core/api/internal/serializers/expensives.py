
from rest_framework import serializers

from accounting_admin.core.accounting.models import Expense


class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        exclude = ["user"]
        
    def create(self, data):
        data["user"] = self.context.get("request").user
        return super().create(data)