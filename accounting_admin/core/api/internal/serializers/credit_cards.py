from rest_framework import serializers

from accounting_admin.core.api.internal.serializers.banks import BankSerializer
from accounting_admin.core.credit_cards.models import CreditCard


class CreditCardListSerializer(serializers.ModelSerializer):
    bank = BankSerializer()

    class Meta:
        model = CreditCard
        fields = "__all__"


class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = "__all__"
