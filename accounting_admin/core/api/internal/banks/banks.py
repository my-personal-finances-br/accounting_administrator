from rest_framework import generics

from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers import banks
from accounting_admin.core.banks.models import Bank


class BankListView(generics.ListCreateAPIView, GenericAuthenticationRequired):
    serializer_class = banks.BankSerializer

    def get_queryset(self):
        return Bank.objects.filter(user_id=self.request.user.id).order_by("name")


class BankRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = banks.BankSerializer

    def get_queryset(self):
        return Bank.objects.filter(user_id=self.request.user.id).order_by("name")
