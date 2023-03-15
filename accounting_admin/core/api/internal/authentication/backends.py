from rest_framework.views import APIView

from accounting_admin.core.api.internal.authentication import permissions


class GenericAuthenticationRequired(APIView):
    permission_classes = (permissions.GenericIsAuthenticated,)


class BackofficeUserAuthenticationRequired(APIView):
    permission_classes = (permissions.BackofficeIsAuthenticatedPermission,)