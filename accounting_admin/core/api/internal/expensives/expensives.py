from rest_framework import generics


from accounting_admin.core.api.internal.serializers import expensives
from accounting_admin.core.accounting.models import Expense, MonthlyExpense


class ListExpensesView(generics.ListCreateAPIView):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_queryset(self):
        return MonthlyExpense.objects.filter(user_id=self.request.user.id)