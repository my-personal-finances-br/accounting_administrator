from rest_framework import serializers

from accounting_admin.core.salary.models import ExpectedSalary, Salary
from accounting_admin.utils.constants import MONTHS


class ExpectedSalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpectedSalary
        fields = "__all__"


class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = "__all__"
