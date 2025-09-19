from django.db import transaction

from ...models import TaskStep, Task


def toggle_step(step: TaskStep) -> None:
    step.is_done = not step.is_done
    step.save()


@transaction.atomic
def update_steps(task: Task, data) -> None:
    existing_steps = {step.id: step for step in task.steps.all()}
    received_ids = []

    for step_data in data:
        step_id = step_data.get("id")
        if step_id and step_id in existing_steps:
            step = existing_steps[step_id]
            step.title = step_data["title"]
            step.save()
            received_ids.append(step_id)
        else:
            task.steps.create(title=step_data["title"])

    to_delete = [sid for sid in existing_steps if sid not in received_ids]
    task.steps.filter(id__in=to_delete).delete()
