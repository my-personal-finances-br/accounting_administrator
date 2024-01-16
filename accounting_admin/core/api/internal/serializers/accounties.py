from rest_framework import serializers

from accounting_admin.core.accounts.models import Account, AccountSubscriber


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class AccountSubscriberSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = AccountSubscriber
        fields = "__all__"
