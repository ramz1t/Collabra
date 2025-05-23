from rest_framework.permissions import AllowAny, IsAuthenticated
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
    search_fields = ["user__first_name", "user__last_name", "user__email", "status"]
    filterset_fields = ["is_admin"]
    ordering = ["user__first_name", "user__last_name"]


class TaskMixin(GenericViewSet):
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["title", "description"]
    ordering_fields = ["title", "id", "-id", "updated_at", "-updated_at"]
    filterset_fields = ["status", "tag"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.getlist('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset


class TagMixin(GenericViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering = ["title"]


class StatsMixin(GenericViewSet):
    permission_classes = (IsAuthenticated,)
