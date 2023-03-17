from django.urls import path

from accounting_admin.core.api import internal

authentication_urls = [
    path(
        "internal/me/logout",
        internal.authentication.views.logout_view,
        name="api-internal-logout",
    ),
    path(
        "internal/authenticate",
        internal.authentication.views.AuthenticateView.as_view(),
        name="api-internal-authenticate",
    ),
    path(
        "internal/authenticate/generics",
        internal.authentication.views.GenericAuthenticationView.as_view(),
        name="api-internal-authenticate-generics",
    ),
    path(
        "internal/authenticate/staff",
        internal.authentication.views.AuthenticateBackofficeView.as_view(),
        name="api-internal-authenticate-staff",
    ),
]

expenses_urls = [
    path(
        "internal/expenses",
        internal.expensives.expensives.ListExpensesView.as_view(),
        name="api-expenses",
    ),
    path(
        "internal/expenses/closure",
        internal.expensives.expensives.MonthClosureView.as_view(),
        name="api-expenses-closure",
    ),
    path(
        "internal/expenses/create",
        internal.expensives.expensives.CreateExpenseView.as_view(),
        name="api-expenses-create",
    ),
    path(
        "internal/expenses/monthly_expense",
        internal.expensives.expensives.CreateMonthlyExpense.as_view(),
        name="api-expenses-monthly_expense",
    ),
]


urlpatterns = expenses_urls + authentication_urls
