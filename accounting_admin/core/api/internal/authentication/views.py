import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import exceptions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounting_admin.core.api.internal.authentication.backends import (
    GenericAuthenticationRequired,
)
from accounting_admin.core.api.internal.serializers import users

User = get_user_model()


class AuthenticateView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        if not user:
            raise exceptions.AuthenticationFailed()
        login(request=request, user=user)
        return HttpResponse(users.UserSerializer(user).data)


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


class RegisterUserView(generics.CreateAPIView):
    serializer_class = users.UserSerializer

    def create(self, request, *args, **kwargs):
        request.data.update({"is_superuser": False, "is_staff": False})
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        try:
            user = User.objects.get(id=serializer.data.get("id"))
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed()
        user.set_password(request.data["password"])
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserView(APIView):
    serializer_class = users.UserSerializer

    def get(self, request, *args, **kwargs):
        return Response(self.serializer_class(request.user).data)


@csrf_exempt
def logout_view(request):
    origin_url = request.session.get("authentication_origin_url")
    logout(request)

    return HttpResponse(
        json.dumps({"origin_url": origin_url}), content_type="application/json"
    )
