from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from .serializers import UserCreateSerializer


class UserMixin(GenericViewSet):
    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (AllowAny,)
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
