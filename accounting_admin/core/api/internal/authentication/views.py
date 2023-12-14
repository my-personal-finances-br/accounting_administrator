import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()


class AuthenticateView(APIView):
    def _invalid_credentials(self):
        return Response(
            {"error": "Username or password invalid", "code": "INVALID_CREDENTIALS"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class AuthenticateBackofficeView(AuthenticateView):
    def post(self, request):
        required_fields = ["username", "password"]
        if not all([field in request.data for field in required_fields]):
            return Response(
                {"error": "missing required fields"}, status=status.HTTP_400_BAD_REQUEST
            )

        username = request.data["username"]
        password = request.data["password"]

        user = None

        try:
            staff = User.objects.get(username=username, is_staff=True)
            user = authenticate(request, username=staff.username, password=password)
        except User.DoesNotExist:
            pass

        if user is None:
            return self._invalid_credentials()

        self._login_user_and_set_session_data(request, user)
        return Response({})

    def _login_user_and_set_session_data(self, request, user):
        origin_url = request.data.get("origin_url")

        login(request, user)
        request.session["authentication_backend_used"] = "backoffice"
        request.session["authentication_origin_url"] = origin_url


class NewAuthenticateView(APIView):
    def post(self, request):
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        login(request=request, user=user)
        if user is not None:
            login(request=request, user=user)
            return HttpResponse({"parabens": "vc logou"})
        else:
            return HttpResponse({"deu ruim": "vc n logou"})


@csrf_exempt
def logout_view(request):
    origin_url = request.session.get("authentication_origin_url")
    logout(request)

    return HttpResponse(
        json.dumps({"origin_url": origin_url}), content_type="application/json"
    )
