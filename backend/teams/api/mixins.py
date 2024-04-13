from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.filters import SearchFilter

from .pagination import TeamPagination


class TeamMixin(GenericViewSet):
    pagination_class = TeamPagination
    filter_backends = [SearchFilter]
    search_fields = ["title"]

    def get_permissions(self):
        if self.action in ("create", "retrieve_short"):
            self.permission_classes = (AllowAny,)
        else:
            self.permission_classes = (IsAuthenticated,)
        return super().get_permissions()
