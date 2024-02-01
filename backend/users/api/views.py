from rest_framework import status
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _

from .mixins import UserMixin
from ..services.create_service import create_user


class UsersViewSet(UserMixin):
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_user(**serializer.validated_data)
        data = {"message": _("User created")}
        return Response(data, status=status.HTTP_201_CREATED)
