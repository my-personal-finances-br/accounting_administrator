from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounting_admin.core.api.internal.serializers.accounties import (
    AccountSubscriberSerializer,
)

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    accounts = AccountSubscriberSerializer(many=True)

    class Meta:
        model = User
        exclude = [
            "password",
            "is_superuser",
            "is_staff",
            "is_active",
            "groups",
            "user_permissions",
        ]
