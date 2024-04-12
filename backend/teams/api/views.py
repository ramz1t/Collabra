from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _

from . import mixins
from . import serializers
from ..selectors import (
    get_team_or_404,
    get_teams,
    is_user_admin_by_team,
    is_user_member_by_team,
    get_users_to_invite,
)
from ..services.create import create_team
from ..services.delete import delete_team
from ..services.join import refresh_join_keys, invite, remove_from_invited, join


class TeamViewSet(mixins.TeamMixin):
    def create(self, request):
        serializer = serializers.TeamCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        create_team(request.user, **serializer.validated_data)

        data = {"message": _("Team created")}
        return Response(data, status=status.HTTP_201_CREATED)

    def remove(self, request, pk):
        team = get_team_or_404(id=pk)
        if team.owner != request.user:
            raise PermissionDenied()

        serializer = serializers.TeamDeleteSerializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)

        delete_team(team)

        data = {"message": _("Team deleted")}
        return Response(data, status=status.HTTP_200_OK)

    def retrieve(self, request, slug):
        team = get_team_or_404(slug=slug)
        if is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        serializer = serializers.TeamDetailSerializer(instance=team)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def list(self, request):
        queryset = self.filter_queryset(get_teams(owner=self.request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = serializers.TeamListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializers.TeamListSerializer(queryset, many=True)

        return Response(status.HTTP_200_OK, serializer.data)

    def get_join_keys(self, request, pk):
        team = get_team_or_404(id=pk)
        if not is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TeamJoinKeysRetrieveSerializer(instance=team)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def refresh_join_keys(self, request, pk):
        team = get_team_or_404(id=pk)
        if not is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        refresh_join_keys(team)

        return Response(status=status.HTTP_200_OK)

    def invite(self, request, pk):
        team = get_team_or_404(id=pk)
        if not is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TeamInviteSerializer(
            data=request.data, context={"user": request.user, "team": team}
        )
        serializer.is_valid(raise_exception=True)

        invite(team, serializer.validated_data["user"])

        return Response(status=status.HTTP_200_OK)

    def remove_from_invited(self, request, pk):
        team = get_team_or_404(id=pk)
        if not is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TeamRemoveFromInvitedSerializer(
            data=request.data, context={"team": team}
        )
        serializer.is_valid(raise_exception=True)

        remove_from_invited(team, serializer.validated_data["user"])

        return Response(status=status.HTTP_200_OK)

    def join(self, request, slug, key):
        team = get_team_or_404(slug=slug)

        request.data["key"] = str(key)
        serializer = serializers.TeamJoinSerializer(
            data=request.data, context={"team": team, "user": request.user}
        )
        serializer.is_valid(raise_exception=True)

        join(team, key, request.user)

        return Response(status=status.HTTP_200_OK)

    def get_users_to_invite(self, request, pk, info):
        team = get_team_or_404(id=pk)
        if not is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        users = get_users_to_invite(info)

        serializer = serializers.UserToInviteSerializer(
            instance=users, many=True, context={"team": team}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)
