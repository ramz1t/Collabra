from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _

from .. import mixins
from ... import selectors
from ..serializers import tasks as serializers
from ...models import Task
from ...services.tasks.create import create_task
from ...selectors import get_team_or_404
from ...services.tasks.delete import multiple_remove
from ...services.tasks.update import update_task


class TaskViewSet(mixins.TaskMixin):
    queryset = Task.objects.all()

    @staticmethod
    def _get_multiple_remove_message(number_of_removed_tasks: int) -> str:
        if number_of_removed_tasks == 1:
            return _("Task removed")
        else:
            return _("{} tasks removed").format(
                number_of_removed_tasks
            )

    def create(self, request, slug):
        team = get_team_or_404(slug=slug)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TaskCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task = create_task(team, request.user, **serializer.validated_data)

        response_data = serializers.TaskSerializer(
            instance=task,
            context={'team': team}
        ).data
        response_data.update({'message': _('Task created')})

        return Response(response_data, status=status.HTTP_201_CREATED)

    def list(self, request, slug):
        team = selectors.get_team_or_404(slug=slug)
        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        tasks = self.filter_queryset(self.get_queryset().filter(team=team))
        page = self.paginate_queryset(tasks)
        if page is not None:
            serializer = serializers.TaskSerializer(
                page, many=True, context={"team": team}
            )
            return self.get_paginated_response(serializer.data)

        serializer = serializers.TaskSerializer(tasks, many=True, context={"team": team})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, slug, pk):
        team = selectors.get_team_or_404(slug=slug)
        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        task = selectors.get_task_or_404(id=pk)

        serializer = serializers.TaskSerializer(
            instance=task, context={"team": team}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, slug, pk):
        team = selectors.get_team_or_404(slug=slug)
        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        task = selectors.get_task_or_404(id=pk)

        update_task(task, request.user, **request.data)

        response_data = serializers.TaskSerializer(
            instance=task, context={"team": team}
        ).data
        response_data.update({'message': _('Task updated')})
        return Response(response_data, status=status.HTTP_200_OK)

    def remove(self, request, slug):
        team = selectors.get_team_or_404(slug=slug)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TaskDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tasks = selectors.get_tasks(team=team)

        removed_tasks_count = multiple_remove(tasks, serializer.validated_data)

        response_data = {'message': self._get_multiple_remove_message(removed_tasks_count)}
        return Response(response_data, status=status.HTTP_200_OK)
