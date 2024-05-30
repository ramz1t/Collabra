from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .pagination import CustomPagination


class TeamMixin(GenericViewSet):
    pagination_class = CustomPagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title"]
    ordering_fields = ["title", "id", "-id"]
    ordering = ["-id"]

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (AllowAny,)
        return super().get_permissions()


class MemberMixin(GenericViewSet):
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["is_admin"]
    ordering = ["user__first_name", "user__last_name"]
