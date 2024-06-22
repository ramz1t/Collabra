from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _

from .. import mixins
from ..serializers import teams as serializers
from ... import selectors
from ...services.teams.create import create_team
from ...services.teams.delete import delete_team
from ...services.teams.update import update_team
from ...services.teams.transfer import transfer_team
from ...services.teams.join import refresh_join_keys, exit_team


class TeamViewSet(mixins.TeamMixin):
    def create(self, request):
        serializer = serializers.TeamCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        team = create_team(request.user, **serializer.validated_data)

        data = {"message": _("Team created"), "slug": team.slug}
        return Response(data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TeamUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        update_team(team, **serializer.validated_data)

        serializer = serializers.TeamRetrieveSerializer(
            instance=team, context={"user": request.user}
        )
        data = {"message": _("Team updated"), **serializer.data}
        return Response(data=data, status=status.HTTP_200_OK)

    def remove(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_owner_by_team(team, request.user):
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
        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        serializer = serializers.TeamRetrieveSerializer(
            instance=team, context={"user": request.user}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve_short(self, request, slug):
        team = selectors.get_team_or_404(slug=slug)

        serializer = serializers.TeamShortRetrieveSerializer(
            instance=team, context={"user": request.user}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def list(self, request):
        teams = self.filter_queryset(selectors.get_teams(members__user=request.user))

        page = self.paginate_queryset(teams)
        if page is not None:
            serializer = serializers.TeamListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializers.TeamListSerializer(teams, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

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

    def exit(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_member_by_team(
            team, request.user
        ) or selectors.is_user_owner_by_team(team, request.user):
            raise PermissionDenied()

        exit_team(team, request.user)

        data = {"message": _("You exited")}
        return Response(data, status=status.HTTP_200_OK)

    def transfer(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_owner_by_team(team, request.user):
            raise PermissionDenied()

        serializer = serializers.TransferSerializer(
            data=request.data, context={"team": team, "user": request.user}
        )
        serializer.is_valid(raise_exception=True)

        transfer_team(team, serializer.validated_data["user"])

        data = {"message": _("Team transferred")}
        return Response(data, status=status.HTTP_200_OK)
