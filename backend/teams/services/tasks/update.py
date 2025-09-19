from django.db import transaction
from django.utils.translation import gettext_lazy as _

from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied

from ... import selectors
from ...models import Task
from ...selectors import get_tag_or_404, get_member_or_404


User = get_user_model()


def _check_permissions(task: Task, user: User, **fields):
    is_admin = selectors.is_user_admin_by_team(user, task.team)
    is_assignee = selectors.is_user_assignee_by_task(user, task)

    status = fields.get('status')

    # Admin can do anything
    if is_admin:
        return

    # Assignee can only change status
    if is_assignee:
        if not (len(fields) == 1 and 'status' in fields):
            raise PermissionDenied(_("You can only change the status"))
        if task.requires_review and status == 'done':
            raise PermissionDenied(_("Ask your administrator for review and submit"))
        return

    # Ordinary users (not admin, not assignee) cannot modify anything
    raise PermissionDenied(_("You do not have permission to modify this task"))


@transaction.atomic
def update_task(task: Task, user: User, **fields) -> Task:
    _check_permissions(task, user, **fields)

    if 'tag' in fields:
        tag = fields.pop('tag')
        task.tag = get_tag_or_404(pk=tag) if tag is not None else None

    if 'assignee' in fields:
        assignee = fields.pop('assignee')
        task.assignee = get_member_or_404(pk=assignee) if assignee is not None else None

    allowed_fields = {'status', 'title', 'description', 'deadline', 'requires_review'}
    for field, value in fields.items():
        if field in allowed_fields:
            setattr(task, field, value)

    task.save()
    return task

