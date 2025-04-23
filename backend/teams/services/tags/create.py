from django.db import transaction

from ...models import Team, TaskTag

@transaction.atomic
def create_tag(team: Team, **fields) -> TaskTag:
    tag = TaskTag.objects.create(team=team, **fields)

    return tag