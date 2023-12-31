from django.urls import path

from accounting_admin.core.api import internal

authentication_urls = [
    path(
        "internal/me/logout",
        internal.authentication.views.logout_view,
        name="api-internal-logout",
    ),
    path(
        "internal/authenticate/generics",
        internal.authentication.views.NewAuthenticateView.as_view(),
        name="api-internal-authenticate-generics",
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
        "internal/monthly_expense/<str:pk>/closure",
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
        name="api-expected-expenses-list",
    ),
    path(
        "internal/expected_expenses/<str:pk>",
        internal.expensives.expensives.ExpectedExpenseRetrieveView.as_view(),
        name="api-expected-expenses-retrieve",
    ),
]

salary_urls = [
    path(
        "internal/expected_salaries",
        internal.salary.salary.ExpectedSalaryListView.as_view(),
        name="api-expected-salaries-list",
    ),
    path(
        "internal/expected_salaries/<str:pk>",
        internal.salary.salary.ExpectedSalaryRetrieveView.as_view(),
        name="api-expected-salaries-retrieve",
    ),
    path(
        "internal/salaries",
        internal.salary.salary.SalaryListView.as_view(),
        name="api-salaries-list",
    ),
    path(
        "internal/salaries/<str:pk>",
        internal.salary.salary.SalaryRetrieveView.as_view(),
        name="api-salaries-retrieve",
    ),
]


bank_urls = [
    path(
        "internal/banks",
        internal.banks.banks.BankListView.as_view(),
        name="api-banks-list",
    ),
    path(
        "internal/banks/<str:pk>",
        internal.banks.banks.BankRetrieveView.as_view(),
        name="api-banks-retrieve",
    ),
]

credit_cards_urls = [
    path(
        "internal/credit_cards",
        internal.credit_cards.credit_cards.CreditCardListView.as_view(),
        name="api-credit-cards-list",
    ),
    path(
        "internal/credit_cards/<str:pk>",
        internal.credit_cards.credit_cards.CreditCardRetrieveView.as_view(),
        name="api-credit-cards-retrieve",
    ),
]



urlpatterns = expenses_urls + authentication_urls + salary_urls + bank_urls + credit_cards_urls
