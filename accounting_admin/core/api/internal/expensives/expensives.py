from decimal import *

from rest_framework import generics
from rest_framework.response import Response

from accounting_admin.core.accounting.models import Expense, MonthlyExpense
from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers import expensives


class MonthlyExpenseView(generics.ListCreateAPIView):  # , GenericAuthenticationRequired):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_queryset(self):
        return (
            MonthlyExpense.objects.filter(user_id=self.request.user.id)
            .distinct()
            .order_by("created_at__year", "month_number")
        )


class MonthClosureView(generics.CreateAPIView):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_object(self):
        return (
            MonthlyExpense.objects.filter(
                user_id=self.request.user.id, detail__isnull=True
            )
            .order_by("month_number")
            .first()
        )

    def create(self, request, *args, **kwargs):
        monthly_expense = self.get_object()
        monthly_expense.closure()
        return Response(
            {
                "closure": "success",
                "data": {**self.serializer_class(monthly_expense).data},
            }
        )


class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = expensives.ExpensesSerializer
    queryset = Expense.objects.all()


class ExpenseUpdateRetrieveView(
    generics.RetrieveAPIView, generics.UpdateAPIView, generics.DestroyAPIView
):
    serializer_class = expensives.ExpensesSerializer
    queryset = Expense.objects.all()


class MonthlyExpenseDetailView(generics.RetrieveAPIView):
    serializer_class = expensives.MonthlyExpenseDetailSerializer
    queryset = MonthlyExpense.objects.all()
