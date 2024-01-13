import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import exceptions
from rest_framework.views import APIView

from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers.users import UserSerializer

User = get_user_model()


class AuthenticateView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        if not user:
            raise exceptions.AuthenticationFailed()
        login(request=request, user=user)
        return HttpResponse(UserSerializer(user).data)


class ChangePasswordView(GenericAuthenticationRequired):
    def post(self, request):
        user = request.user
        old_password = request.data["old_password"]
        new_password = request.data["new_password"]
        if not user.check_password(old_password):
            raise exceptions.PermissionDenied()
        user.set_password(new_password)
        user.save()
        return HttpResponse("Senha alterada com sucesso", status=204)


@csrf_exempt
def logout_view(request):
    origin_url = request.session.get("authentication_origin_url")
    logout(request)

    return HttpResponse(
        json.dumps({"origin_url": origin_url}), content_type="application/json"
    )
