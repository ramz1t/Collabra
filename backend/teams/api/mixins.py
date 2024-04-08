from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .pagination import TeamPagination


class TeamMixin(GenericViewSet):
    pagination_class = TeamPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {"title": ["exact", "contains"]}

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (AllowAny,)
        if self.action in ("remove", "list"):
            self.permission_classes = (IsAuthenticated,)
        return super().get_permissions()
