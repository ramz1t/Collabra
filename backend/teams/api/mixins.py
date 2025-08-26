from django.db.models import Q
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .pagination import CustomPagination

from django.utils import timezone
from datetime import timedelta


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
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title", "description"]
    ordering_fields = ["title", "id", "-id", "updated_at", "-updated_at"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = super().get_queryset()

        # filter by status
        statuses = self.request.query_params.getlist('status')
        if statuses:
            queryset = queryset.filter(status__in=statuses)

        # filter by tag
        tag = self.request.query_params.get('tag')
        if tag == '' or tag == 'null':
            queryset = queryset.filter(tag__isnull=True)
        elif tag is not None:
            queryset = queryset.filter(tag=tag)


        # filter by deadline
        is_deadline_soon = self.request.query_params.get('is_deadline_soon')
        if is_deadline_soon == 'true':
            now = timezone.now()
            soon = now + timedelta(days=4)
            queryset = queryset.filter(
                Q(deadline__lte=soon) & Q(deadline__isnull=False) & ~Q(status="done")
            )

        return queryset


class TagMixin(GenericViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering = ["title"]


class StatsMixin(GenericViewSet):
    permission_classes = (IsAuthenticated,)
