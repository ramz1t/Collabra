from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from . import serializers


class UserMixin(GenericViewSet):
    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (AllowAny,)
        if self.action in ("retrieve", "delete", "update"):
            self.permission_classes = (IsAuthenticated,)
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return serializers.UserCreateSerializer
        if self.action == "update":
            return serializers.UserUpdateSerializer
        if self.action == "retrieve":
            return serializers.UserRetrieveSerializer
