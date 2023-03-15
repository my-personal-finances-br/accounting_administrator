from rest_framework import generics


from accounting_admin.core.api.internal.serializers import expensives
from accounting_admin.core.accounting.models import ExpectedExpense


class ListExpensesView(generics.ListCreateAPIView):
    serializer_class = expensives.ExpensesSerializer

    def get_queryset(self):
        return ExpectedExpense.objects.filter(user_id=self.request.user.id)