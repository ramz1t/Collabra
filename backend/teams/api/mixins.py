from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.filters import SearchFilter

from .pagination import TeamPagination


class TeamMixin(GenericViewSet):
    pagination_class = TeamPagination
    filter_backends = [SearchFilter]
    search_fields = ["title"]

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (AllowAny,)
        if self.action in (
            "remove",
            "list",
            "get_join_keys",
            "refresh_join_keys",
            "invite",
            "remove_from_invited",
            "retrieve",
        ):
            self.permission_classes = (IsAuthenticated,)
        return super().get_permissions()
