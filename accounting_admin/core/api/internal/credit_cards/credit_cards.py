from rest_framework import generics

from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers import credit_cards
from accounting_admin.core.credit_cards.models import CreditCard


class CreditCardListView(generics.ListAPIView, GenericAuthenticationRequired):
    serializer_class = credit_cards.CreditCardListSerializer

    def get_queryset(self):
        return CreditCard.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")


class CreditCardCreateView(generics.CreateAPIView, GenericAuthenticationRequired):
    serializer_class = credit_cards.CreditCardSerializer

    def get_queryset(self):
        return CreditCard.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")

    def create(self, request, *args, **kwargs):
        request.data["account"] = self.request.user.accounts.last().account.uuid
        return super().create(request, *args, **kwargs)


class CreditCardRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = credit_cards.CreditCardSerializer

    def get_queryset(self):
        return CreditCard.objects.filter(
            account_id__in=self.request.user.accounts.values_list("account_id", flat=True)
        ).order_by("name")
