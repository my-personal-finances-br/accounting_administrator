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
        internal.authentication.views.NewAuthenticateView.as_view(),
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
        "internal/monthly_expense",
        internal.expensives.expensives.MonthlyExpenseView.as_view(),
        name="api-monthly-expenses",
    ),
    path(
        "internal/monthly_expense/<str:pk>/detail",
        internal.expensives.expensives.MonthlyExpenseDetailView.as_view(),
        name="api-expenses-monthly_expense-detail",
    ),
    path(
        "internal/monthly_expense/closure",
        internal.expensives.expensives.MonthClosureView.as_view(),
        name="api-expenses-closure",
    ),
    path(
        "internal/expenses",
        internal.expensives.expensives.ExpenseListCreateView.as_view(),
        name="api-expenses-create",
    ),
    path(
        "internal/expenses/<uuid:pk>",
        internal.expensives.expensives.ExpenseUpdateRetrieveView.as_view(),
        name="api-expenses-retrieve",
    ),
    path(
        "internal/expected_expenses",
        internal.expensives.expensives.ExpectedExpenseListView.as_view(),
        name="api-expected-expenses-retrieve",
    ),
    path(
        "internal/expected_expenses/<str:pk>",
        internal.expensives.expensives.ExpectedExpenseRetrieveView.as_view(),
        name="api-expected-expenses-retrieve",
    ),
]


urlpatterns = expenses_urls + authentication_urls
