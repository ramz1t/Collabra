from rest_framework import status
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken

from . import mixins
from .serializers import (
    UserCreateSerializer,
    UserRetrieveSerializer,
    UserUpdateSerializer,
    UserChangePasswordSerializer,
    UserRemoveSerializer,
)
from .. import selectors
from ..services.create import create_user
from ..services.update import update_user
from ..services.delete import delete_user
from ..services.common import set_new_password


class UsersViewSet(mixins.UserMixin):
    def create(self, request):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = create_user(**serializer.validated_data)
        refresh_token = RefreshToken.for_user(user)
        data = {
            "message": _("Profile created"),
            "access": str(refresh_token.access_token),
            "refresh": str(refresh_token),
        }
        return Response(data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk):
        """(ВНИМАНИЕ) Отдаст данные любого юзера"""
        user = selectors.get_user_or_404(pk)
        serializer = UserRetrieveSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def remove(self, request):
        serializer = UserRemoveSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        delete_user(request.user)
        data = {"message": _("Profile deleted")}
        return Response(data, status=status.HTTP_200_OK)

    def update(self, request):
        serializer = UserUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        update_user(request.user, **serializer.validated_data)
        data = {"message": _("Profile updated")}
        return Response(data, status=status.HTTP_200_OK)

    def me(self, request):
        serializer = UserRetrieveSerializer(instance=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def change_password(self, request):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        set_new_password(request.user, serializer.validated_data["new_password"])
        data = {"message": _("Password changed")}
        return Response(data, status=status.HTTP_200_OK)
