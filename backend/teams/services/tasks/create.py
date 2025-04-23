from typing import Optional, List

from django.contrib.auth import get_user_model
from django.db import transaction

from teams.selectors import get_member_or_404
from ...models import Task, Team
from ...selectors import get_tag_or_404
from teams.services.steps.create import create_steps

User = get_user_model()


@transaction.atomic
def create_task(team: Team, user: User, **fields) -> Task:
    tag = fields.pop('tag', None)
    assignee: Optional[str] = fields.pop('assignee', None)
    steps: Optional[List[str]] = fields.pop('steps', None)

    if tag is not None:
        tag = get_tag_or_404(id=tag)

    task = Task.objects.create(
        team=team,
        tag=tag,
        assignee=get_member_or_404(pk=assignee),
        creator=get_member_or_404(user=user, team=team),
        **fields
    )

    create_steps(task, steps)

    return task