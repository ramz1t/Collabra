from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _

from . import mixins
from . import serializers
from ..selectors import get_team_or_404, get_teams
from ..services.create import create_team
from ..services.delete import delete_team


class TeamViewSet(mixins.TeamMixin):
    def create(self, request):
        serializer = serializers.TeamCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_team(request.user, **serializer.validated_data)
        data = {"message": _("Team created")}
        return Response(data, status=status.HTTP_201_CREATED)

    def remove(self, request, pk):
        team = get_team_or_404(pk)
        if team.owner != request.user:
            raise PermissionDenied()
        serializer = serializers.TeamDeleteSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        delete_team(team)
        data = {"message": _("Team deleted")}
        return Response(data, status=status.HTTP_200_OK)

    def list(self, request):
        queryset = self.filter_queryset(get_teams(owner=self.request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = serializers.TeamListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializers.TeamListSerializer(queryset, many=True)
        return Response(status.HTTP_200_OK, serializer.data)
