from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from ... import selectors
from .. import mixins


class StatsViewSet(mixins.StatsMixin):
    def retrieve(self, request, slug):
        team = selectors.get_team_or_404(slug=slug)
        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        stats = {
            "total": selectors.get_tasks_count(team),
            "to_do": selectors.get_tasks_count(team, status="to_do"),
            "in_progress": selectors.get_tasks_count(team, status="in_progress"),
            "need_review": selectors.get_tasks_count(team, status="need_review"),
            "done": selectors.get_tasks_count(team, status="done"),
            "assigned": selectors.get_tasks_count(team, assignee__user=request.user),
        }

        return Response(stats, status=status.HTTP_200_OK)