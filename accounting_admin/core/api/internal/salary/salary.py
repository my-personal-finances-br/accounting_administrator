from rest_framework import generics
from rest_framework.response import Response

from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers import salaries
from accounting_admin.core.salary.models import ExpectedSalary, Salary


class ExpectedSalaryListView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = salaries.ExpectedSalarySerializer

    def get_queryset(self):
        return ExpectedSalary.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")

    def create(self, request, *args, **kwargs):
        request.data["account"] = self.request.user.accounts.last().account.uuid
        return super().create(request, *args, **kwargs)


class ExpectedSalaryRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = salaries.ExpectedSalarySerializer

    def get_queryset(self):
        return ExpectedSalary.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")


class SalaryListView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = salaries.SalarySerializer

    def get_queryset(self):
        return Salary.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")

    def create(self, request, *args, **kwargs):
        request.data["account"] = self.request.user.accounts.last().account.uuid
        return super().create(request, *args, **kwargs)


class SalaryRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = salaries.SalarySerializer

    def get_queryset(self):
        return Salary.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")

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
