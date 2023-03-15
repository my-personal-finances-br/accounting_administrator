from rest_framework import generics


from accounting_admin.core.api.internal.serializers import expensives
from accounting_admin.core.accounting.models import Expense


class ListExpensesView(generics.ListAPIView):
    serializer_class = expensives.ExpensesSerializer

    def get_queryset(self):
        return Expense.objects.all()