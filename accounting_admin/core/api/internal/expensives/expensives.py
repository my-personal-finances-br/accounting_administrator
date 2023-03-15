from rest_framework import generics
from rest_framework.response import Response


from accounting_admin.core.api.internal.serializers import expensives
from accounting_admin.core.accounting.models import MonthlyExpense


class ListExpensesView(generics.ListCreateAPIView):
    serializer_class = expensives.MonthlyExpenseSerializer

    def get_queryset(self):
        return MonthlyExpense.objects.filter(user_id=self.request.user.id)

class MonthClosureView(generics.CreateAPIView):
    serializer_class = expensives.MonthlyExpenseSerializer
    def get_object(self, month):
        return MonthlyExpense.objects.get(user_id=self.request.user.id, month=month)
    
    def create(self, request, *args, **kwargs):
        monthly_expense = self.get_object(request.data.get("month"))
        monthly_expense.closure()
        return Response(
            {
                "closure": "success", "data": {
                    **self.serializer_class(monthly_expense).data
                }
            }
        )
