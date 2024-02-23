from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet


class TeamMixin(GenericViewSet):
    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (AllowAny,)
        if self.action in ():
            self.permission_classes = (IsAuthenticated,)
        return super().get_permissions()
