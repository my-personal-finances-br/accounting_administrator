from rest_framework.permissions import IsAuthenticated

from accounting_admin.core.api.internal.authentication.functions import UserEnvironment


class GenericIsAuthenticated(IsAuthenticated):
    def has_permission(self, request, view):
        return super().has_permission(request, view)

class BackofficeIsAuthenticatedPermission(GenericIsAuthenticated):
    """
    Allows access only to authenticated backoffice users.
    """

    def has_permission(self, request, view):
        is_backoffice_user = UserEnvironment(request).is_backoffice_user
        return super().has_permission(request, view) and is_backoffice_user