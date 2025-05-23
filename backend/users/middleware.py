from django.http import JsonResponse
from django.utils.translation import gettext_lazy as _

from rest_framework_simplejwt.authentication import JWTAuthentication

class DemoModeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_auth = JWTAuthentication()

    def __call__(self, request):
        auth = self.jwt_auth.authenticate(request)
        if auth is not None:
            user, token = auth
            request.user = user

        if request.method != 'GET' and getattr(request.user, 'is_demo', False):
            return JsonResponse(
                {"detail": _("You can't change data in demo mode.")},
                status=401
            )

        return self.get_response(request)
