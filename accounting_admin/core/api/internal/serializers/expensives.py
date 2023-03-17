from django.utils import timezone
from rest_framework import serializers

from accounting_admin.core.accounting.models import Expense, MonthlyExpense
from accounting_admin.utils.constants import MONTHS


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

    def create(self, data):
        user = self.context.get("request").user
        now = timezone.now()
        if data["month"] == "default":
            monthly_expense = (
                MonthlyExpense.objects.filter(user=user, created_at__year=now.year)
                .order_by("month_number")
                .last()
            )
            if not monthly_expense and not now.month == 1:
                month_number = now.month - 1
            else:
                month_number = monthly_expense.month_number + 1
            data["month"] = MONTHS[month_number].capitalize()
        data["month_number"] = month_number
        data["user"] = user
        return super().create(data)

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
