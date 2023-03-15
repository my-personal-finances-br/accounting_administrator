from django.urls import path

from accounting_admin.core.api import internal

# authentication_urls = [
#     path(
#         "internal/me/logout",
#         internal.authentication.views.logout_view,
#         name="api-internal-logout",
#     ),
#     path(
#         "internal/authenticate",
#         internal.authentication.views.AuthenticateView.as_view(),
#         name="api-internal-authenticate",
#     ),
#     path(
#         "internal/authenticate/students",
#         internal.authentication.views.AuthenticateStudentsView.as_view(),
#         name="api-internal-authenticate-students",
#     ),
#     path(
#         "internal/authenticate/staff",
#         internal.authentication.views.AuthenticateStaffView.as_view(),
#         name="api-internal-authenticate-staff",
#     ),
# ]

expenses_urls = [
    path(
        "internal/expenses",
        internal.expensives.expensives.ListExpensesView.as_view(),
        name="api-expenses",
    ),
]


urlpatterns = expenses_urls