from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet


class UserMixin(GenericViewSet):
    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (AllowAny,)
        if self.action in ("retrieve", "delete", "update", "me", "change_password"):
            self.permission_classes = (IsAuthenticated,)
        return super().get_permissions()
