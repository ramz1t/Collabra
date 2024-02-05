from rest_framework import status
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken

from . import mixins
from .. import selectors
from ..services.create_update_service import create_user, update_user
from ..services.delete_service import delete_user


class UsersViewSet(mixins.UserMixin):
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
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
        user = selectors.get_user_or_404(request.user, pk)
        serializer = self.get_serializer(instance=user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = selectors.get_user_or_404(request.user, pk)
        delete_user(request.user, user=user)
        data = {"message": _("Profile deleted")}
        return Response(data, status=status.HTTP_200_OK)

    def update(self, request, pk):
        user = selectors.get_user_or_404(request.user, pk)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        update_user(user, **serializer.validated_data)
        data = {"message": _("Profile updated")}
        return Response(data, status=status.HTTP_200_OK)
