from rest_framework import generics
from rest_framework.response import Response

from accounting_admin.core.accounting.models import Expense, MonthlyExpense
from accounting_admin.core.api.internal.serializers import expensives


class ListExpensesView(generics.ListAPIView):
    serializer_class = None

    def _serialize(self, expensives):
        expenses_by_monthly_expense = {}
        for expensive in expensives:
            if not expenses_by_monthly_expense.get(expensive.monthly_expense.month):
                expenses_by_monthly_expense[expensive.monthly_expense.month] = {
                    "id": str(expensive.monthly_expense.uuid),
                    "total": str(expensive.monthly_expense.total),
                    "month": expensive.monthly_expense.month,
                    "detail": expensive.monthly_expense.detail,
                    "expenses": [
                        {
                            "value": expensive.value,
                            "name": expensive.name,
                            "description": expensive.description,
                        }
                    ],
                }
            else:
                expenses_by_monthly_expense[expensive.monthly_expense.month][
                    "expenses"
                ].append(
                    {
                        "value": expensive.value,
                        "name": expensive.name,
                        "description": expensive.description,
                    }
                )
        return expenses_by_monthly_expense

    def get_queryset(self):
        user_id = self.request.user.id
        monthly_expense_ids = MonthlyExpense.objects.filter(user_id=user_id).values_list(
            "uuid", flat=True
        )
        return (
            Expense.objects.filter(
                monthly_expense_id__in=monthly_expense_ids, user_id=user_id
            )
            .exclude(expected_paid__isnull=False, is_fixed=True)
            .order_by("monthly_expense__month_number")
        )

    def list(self, request):
        qs = self.get_queryset()
        algo = self._serialize(qs)
        return Response(list(algo.values()))


class MonthClosureView(generics.CreateAPIView):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_object(self, month):
        return MonthlyExpense.objects.get(user_id=self.request.user.id, month=month).order_by("monthly_expense__month_number")

    def create(self, request, *args, **kwargs):
        monthly_expense = self.get_object(request.data.get("month"))
        monthly_expense.closure()
        return Response(
            {
                "closure": "success",
                "data": {**self.serializer_class(monthly_expense).data},
            }
        )


class CreateExpenseView(generics.CreateAPIView):
    serializer_class = expensives.CreateExpensesSerializer


class CreateMonthlyExpense(generics.CreateAPIView):
    serializer_class = expensives.MonthlyExpenseSerializer
