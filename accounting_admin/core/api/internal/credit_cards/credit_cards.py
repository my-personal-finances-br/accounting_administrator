from rest_framework import generics

from accounting_admin.core.api.internal.authentication.backends import \
    GenericAuthenticationRequired
from accounting_admin.core.api.internal.serializers import credit_cards
from accounting_admin.core.credit_cards.models import CreditCard


class CreditCardListView(generics.ListAPIView, GenericAuthenticationRequired):
    serializer_class = credit_cards.CreditCardListSerializer

    def get_queryset(self):
        return CreditCard.objects.filter(user_id=self.request.user.id).order_by("name")


class CreditCardCreateView(generics.CreateAPIView, GenericAuthenticationRequired):
    serializer_class = credit_cards.CreditCardSerializer

    def get_queryset(self):
        return CreditCard.objects.filter(user_id=self.request.user.id).order_by("name")

    def create(self, request, *args, **kwargs):
        request.data["user"] = self.request.user.id
        return super().create(request, *args, **kwargs)


class CreditCardRetrieveView(
    generics.RetrieveAPIView,
    generics.UpdateAPIView,
    generics.DestroyAPIView,
    GenericAuthenticationRequired,
):
    serializer_class = credit_cards.CreditCardSerializer

    def get_queryset(self):
        return CreditCard.objects.filter(user_id=self.request.user.id).order_by("name")
