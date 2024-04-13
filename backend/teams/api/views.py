from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _

from . import mixins
from . import serializers
from .. import selectors
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
        team = selectors.get_team_or_404(id=pk)
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
        team = selectors.get_team_or_404(slug=slug)
        if not selectors.is_user_member_by_team(team, self.request.user):
            raise PermissionDenied()

        serializer = serializers.TeamRetrieveSerializer(instance=team)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def list(self, request):
        queryset = self.filter_queryset(selectors.get_teams(owner=self.request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = serializers.TeamListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializers.TeamListSerializer(queryset, many=True)

        return Response(status.HTTP_200_OK, serializer.data)

    def get_join_keys(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.JoinKeysRetrieveSerializer(instance=team)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def refresh_join_keys(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        refresh_join_keys(team)

        data = {"message": _("Keys refreshed")}
        return Response(data, status=status.HTTP_200_OK)

    def invite(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.InviteSerializer(
            data=request.data, context={"user": request.user, "team": team}
        )
        serializer.is_valid(raise_exception=True)
        user_id = serializer.validated_data["user"]

        invite(team, user_id)

        response_user = serializers.InvitedUserListSerializer(
            instance=selectors.get_user_or_404(id=user_id)
        ).data
        data = {"message": _("User invited"), "user": response_user}
        return Response(data, status=status.HTTP_200_OK)

    def remove_from_invited(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.RemoveFromInvitedSerializer(
            data=request.data, context={"team": team}
        )
        serializer.is_valid(raise_exception=True)
        user_id = serializer.validated_data["user"]

        remove_from_invited(team, user_id)

        data = {"message": _("User removed from invited"), "id": user_id}
        return Response(data, status=status.HTTP_200_OK)

    def join(self, request, slug, key):
        team = selectors.get_team_or_404(slug=slug)

        request.data["key"] = str(key)
        serializer = serializers.JoinSerializer(
            data=request.data, context={"team": team, "user": request.user}
        )
        serializer.is_valid(raise_exception=True)

        join(team, key, request.user)

        data = {"message": _("You joined")}
        return Response(data, status=status.HTTP_200_OK)

    def get_users_to_invite(self, request, pk, info):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        users = selectors.get_users_to_invite(info)

        serializer = serializers.UserToInviteListSerializer(
            instance=users, many=True, context={"team": team}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)
