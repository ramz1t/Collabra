from django.db.models import QuerySet

from ...models import Task


from typing import Any


def multiple_remove(tasks: QuerySet[Task], data: dict[str, Any]) -> int:
    count = 0

    ids = data.get('id')
    status = data.get('status')

    if ids is not None:
        if isinstance(ids, list):
            tasks = tasks.filter(pk__in=ids)
        else:
            tasks = tasks.filter(pk=ids)

    if status is not None:
        tasks = tasks.filter(status=status)

    if tasks.exists():
        count = tasks.count()
        tasks.delete()

    return count
