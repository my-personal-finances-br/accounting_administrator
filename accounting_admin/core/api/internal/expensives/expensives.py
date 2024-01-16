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
            MonthlyExpense.objects.filter(
                account_id__in=self.request.user.accounts.values_list(
                    "account_id", flat=True
                )
            )
            .distinct()
            .order_by("-month_year", "-month_number")
        )


class MonthClosureView(generics.UpdateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_queryset(self):
        return MonthlyExpense.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        )

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

    def create(self, request, *args, **kwargs):
        if bool(request.data.get("is_fixed", False)):
            ExpectedExpense.objects.create(
                name=request.data.get("name"),
                value=request.data.get("value"),
                description=request.data.get("description"),
                user=request.user,
                deadline=request.data.get("fixed_deadline"),
                deadline_type=request.data.get("deadline_type"),
                credit_card_id=request.data.get("credit_card_id"),
            )
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        instance = serializer.save()
        if "credit_card_id" in self.request.data:
            credit_card_id = self.request.data.get("credit_card_id")
            instance.credit_card_id = credit_card_id if not credit_card_id == "" else None
            instance.save()

    def get_queryset(self):
        return Expense.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        )


class ExpenseUpdateRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = expensives.ExpensesSerializer

    def get_queryset(self):
        return Expense.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        )

    def perform_update(self, serializer):
        instance = serializer.save()
        if "credit_card_id" in self.request.data:
            credit_card_id = self.request.data.get("credit_card_id")
            instance.credit_card_id = credit_card_id if not credit_card_id == "" else None
            instance.save()


class MonthlyExpenseDetailView(
    generics.RetrieveDestroyAPIView, GenericAuthenticationRequired
):
    serializer_class = expensives.MonthlyExpenseDetailSerializer

    def get_queryset(self):
        return MonthlyExpense.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        )


class ExpectedExpenseListView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = expensives.ExpectedExpenseSerializer

    def get_queryset(self):
        return ExpectedExpense.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")

    def create(self, request, *args, **kwargs):
        request.data["user"] = self.request.user.id
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        instance = serializer.save()
        if "credit_card_id" in self.request.data:
            credit_card_id = self.request.data.get("credit_card_id")
            instance.credit_card_id = credit_card_id if not credit_card_id == "" else None
            instance.save()


class ExpectedExpenseRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = expensives.ExpectedExpenseSerializer

    def get_queryset(self):
        return ExpectedExpense.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        )
