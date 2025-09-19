from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.utils.translation import gettext_lazy as _

from ... import selectors
from ..serializers import tasks as serializers
from ...selectors import get_team_or_404,get_task_or_404, get_step_or_404
from ...services.steps.update import toggle_step, update_steps


class StepViewSet(viewsets.GenericViewSet):
    def list(self, request, slug, task_pk):
        team = selectors.get_team_or_404(slug=slug)
        task = get_task_or_404(id=task_pk)

        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        steps = selectors.get_steps(task=task)
        serializer = serializers.TaskStepListSerializer(instance=steps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def toggle(self, request, slug, task_pk, step_pk):
        team = get_team_or_404(slug=slug)
        task = get_task_or_404(pk=task_pk)
        if not (selectors.is_user_admin_by_team(request.user, team)
                or selectors.is_user_assignee_by_task(request.user, task)):
            raise PermissionDenied()

        step = get_step_or_404(pk=step_pk)
        toggle_step(step)

        response_data = {"message": _("Step toggled"), "value": step.is_done}
        return Response(response_data, status=status.HTTP_200_OK)

    def update(self, request, slug, task_pk):
        team = get_team_or_404(slug=slug)
        task = get_task_or_404(pk=task_pk)
        if not (selectors.is_user_admin_by_team(request.user, team)):
            raise PermissionDenied()

        serializer = serializers.TaskStepUpdateSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        update_steps(task, serializer.validated_data)

        response_serializer = serializers.TaskStepListSerializer(instance=task.steps, many=True)
        response_data = {"message": _("Subtasks updated"), "steps": response_serializer.data}
        return Response(response_data, status=status.HTTP_200_OK)