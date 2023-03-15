from rest_framework import serializers

from accounting_admin.core.accounting.models import Expense, MonthlyExpense


class ExpectedPaidExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["uuid", "value", "name"]


class ExpensesSerializer(serializers.ModelSerializer):
    expected_paid = ExpectedPaidExpensesSerializer(read_only=True)
    monthly_expense = serializers.CharField(read_only=True)

    class Meta:
        model = Expense
        exclude = [
            "user",
        ]

    def create(self, data):
        data["user"] = self.context.get("request").user
        return super().create(data)


class MonthlyExpenseSerializer(serializers.ModelSerializer):
    expenses = serializers.SerializerMethodField()
    user = serializers.CharField(read_only=True)

    def get_expenses(self, instance):
        return ExpensesSerializer(instance.expenses.all(), many=True).data

    class Meta:
        model = MonthlyExpense
        fields = "__all__"

class CreateExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        exclude = ["user"]
        
    def create(self, data):
        data["user"] = self.context.get("request").user
        return super().create(data)    