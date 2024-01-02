from rest_framework import generics
from rest_framework.response import Response

from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers import expensives
from accounting_admin.core.expense.models import ExpectedExpense, Expense, MonthlyExpense


class MonthlyExpenseView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_queryset(self):
        return (
            MonthlyExpense.objects.filter(user_id=self.request.user.id)
            .distinct()
            .order_by("-month_year", "-month_number")
        )


class MonthClosureView(generics.UpdateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_queryset(self):
        return MonthlyExpense.objects.filter(user_id=self.request.user.id)

    def put(self, request, *args, **kwargs):
        monthly_expense = self.get_object()
        monthly_expense.closure()
        return Response(
            {
                "closure": f"{monthly_expense.month} success",
                "data": {**self.serializer_class(monthly_expense).data},
            }
        )


class ExpenseListCreateView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.ExpensesSerializer

    def get_queryset(self):
        return Expense.objects.filter(user_id=self.request.user.id)


class ExpenseUpdateRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = expensives.ExpensesSerializer

    def get_queryset(self):
        return Expense.objects.filter(user_id=self.request.user.id)


class MonthlyExpenseDetailView(generics.RetrieveAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.MonthlyExpenseDetailSerializer

    def get_queryset(self):
        return MonthlyExpense.objects.filter(user_id=self.request.user.id)


class ExpectedExpenseListView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.ExpectedExpenseSerializer

    def get_queryset(self):
        return ExpectedExpense.objects.filter(user_id=self.request.user.id).order_by(
            "name"
        )

    def create(self, request, *args, **kwargs):
        request.data["user"] = self.request.user.id
        return super().create(request, *args, **kwargs)


class ExpectedExpenseRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = expensives.ExpectedExpenseSerializer

    def get_queryset(self):
        return ExpectedExpense.objects.filter(user_id=self.request.user.id)
