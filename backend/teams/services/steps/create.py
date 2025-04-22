from typing import List

from ...models import Task, TaskStep

def create_steps(task: Task, steps: List[str]) -> None:
    TaskStep.objects.bulk_create([TaskStep(task=task, title=step) for step in steps])