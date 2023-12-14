from decimal import *

from rest_framework import generics
from rest_framework.response import Response

from accounting_admin.core.accounting.models import (
    ExpectedExpense,
    ExpectedSalary,
    Expense,
    MonthlyExpense,
    Salary,
)
from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers import expensives


class MonthlyExpenseView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_queryset(self):
        return (
            MonthlyExpense.objects.filter(user_id=self.request.user.id)
            .distinct()
            .order_by("created_at__year", "month_number")
        )


class MonthClosureView(generics.CreateAPIView, GenericAuthenticationRequired):
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
        return ExpectedExpense.objects.filter(user_id=self.request.user.id)

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


class ExpectedSalaryListView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.ExpectedSalarySerializer

    def get_queryset(self):
        return ExpectedSalary.objects.filter(user_id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        request.data["user"] = self.request.user.id
        return super().create(request, *args, **kwargs)


class ExpectedSalaryRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = expensives.ExpectedSalarySerializer

    def get_queryset(self):
        return ExpectedSalary.objects.filter(user_id=self.request.user.id)


class SalaryListView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.SalarySerializer

    def get_queryset(self):
        return Salary.objects.filter(user_id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        request.data["user"] = self.request.user.id
        return super().create(request, *args, **kwargs)


class SalaryRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = expensives.SalarySerializer

    def get_queryset(self):
        return Salary.objects.filter(user_id=self.request.user.id)

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset()).filter(
            **{"monthly_id": self.kwargs[self.lookup_url_kwarg or self.lookup_field]}
        )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
