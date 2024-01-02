from datetime import datetime, timedelta

from django.utils import timezone
from rest_framework import serializers

from accounting_admin.core.expense.models import ExpectedExpense, Expense, MonthlyExpense
from accounting_admin.utils.constants import MONTHS


class ExpectedPaidExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["uuid", "value", "name"]


class MonthlyExpenseSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    expenses = serializers.SerializerMethodField()
    user = serializers.CharField(read_only=True)

    def get_expenses(self, instance):
        now = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        last_day_of_month = now.replace(day=1, month=now.month + 1) - timedelta(days=1)
        expenses_data = instance.expenses.all().order_by("-paid_value", "deadline")

        expenses_dict = {
            "no_card": {
                "expenses": [],
                "closure": last_day_of_month,
                "deadline": last_day_of_month,
            },
        }
        for expense in expenses_data:
            if expense.credit_card:
                credit_card_name = expense.credit_card.name
                if credit_card_name not in expenses_dict:
                    expenses_dict[credit_card_name] = {
                        "expenses": [],
                        "closure": now.replace(
                            day=expense.credit_card.closure,
                            month=(instance.month_number + 1),
                        ),
                        "deadline": now.replace(
                            day=expense.credit_card.deadline,
                            month=(instance.month_number + 1),
                        ),
                    }
                expenses_dict[credit_card_name]["expenses"].append(
                    ExpensesSerializer(expense).data
                )
            else:
                expenses_dict["no_card"]["expenses"].append(
                    ExpensesSerializer(expense).data
                )

        no_card = expenses_dict.pop("no_card")
        expenses_dict["no_card"] = no_card
        return expenses_dict

    def get_total(self, instance):
        return instance.total or instance.parcial_total

    def create(self, data):
        user = self.context.get("request").user
        now = timezone.now()
        if data["month"] == "default":
            monthly_expense = (
                MonthlyExpense.objects.filter(
                    user=user,
                )
                .order_by("month_year", "month_number")
                .last()
            )
            if not monthly_expense and not now.month == 1:
                month_number = now.month - 1
                month_year = now.year
            elif (
                monthly_expense
                and monthly_expense.month_number == 11
                and (now.month == 1)
            ):
                month_number = 0
                month_year = monthly_expense.month_year + 1
            elif (monthly_expense and monthly_expense.month_number == 11) and not (
                now.month == 1
            ):
                month_number = 0
                month_year = monthly_expense.month_year + 1
            elif monthly_expense:
                month_number = monthly_expense.month_number + 1
                month_year = monthly_expense.month_year
            elif not monthly_expense:
                month_number = now.month - 1
                month_year = now.year
            data["month"] = MONTHS[month_number].capitalize()
            data["month_number"] = month_number
            data["month_year"] = month_year
        data["user"] = user
        return super().create(data)

    class Meta:
        model = MonthlyExpense
        fields = "__all__"


class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        exclude = ["user"]

    def create(self, data):
        data["user"] = self.context.get("request").user
        return super().create(data)


class MonthlyExpenseDetailSerializer(serializers.Serializer):
    month = serializers.ReadOnlyField()
    total = serializers.ReadOnlyField(source="parcial_total")
    to_pay = serializers.ReadOnlyField()
    salary_total = serializers.ReadOnlyField()
    to_save = serializers.ReadOnlyField(source="try_to_save")
    paid = serializers.ReadOnlyField()
    salary_left = serializers.ReadOnlyField()


class ExpectedExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpectedExpense
        fields = "__all__"
