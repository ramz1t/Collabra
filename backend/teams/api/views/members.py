from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _

from .. import mixins
from ..serializers import members as serializers
from ... import selectors
from ...services.join import invite, remove_from_invited, join
from ...services.membership import multiple_remove


class MemberViewSet(mixins.MemberMixin):
    @staticmethod
    def _get_multiple_remove_message(number_of_removed_members: int) -> str:
        return _("{} member{} successfully removed").format(
            number_of_removed_members, "s" if number_of_removed_members != 1 else ""
        )

    def multiple_remove(self, request, pk):
        team = selectors.get_team_or_404(id=pk)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        request.team = team
        serializer = serializers.MultipleRemoveSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        multiple_remove(team, serializer.validated_data["members"])

        data = {
            "message": self._get_multiple_remove_message(
                len(serializer.validated_data["members"])
            )
        }
        return Response(data, status=status.HTTP_200_OK)

    def list(self, request, pk):
        team = selectors.get_team_or_404(pk=pk)
        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        members = self.filter_queryset(selectors.get_team_members(team))
        page = self.paginate_queryset(members)
        if page is not None:
            serializer = serializers.ListSerializer(
                page, many=True, context={"team": team}
            )
            return self.get_paginated_response(serializer.data)

        serializer = serializers.ListSerializer(team, many=True, context={"team": team})

        return Response(serializer.data, status=status.HTTP_200_OK)

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
