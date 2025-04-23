from ...models import TaskStep

def toggle_step(step: TaskStep) -> None:
    step.is_done = not step.is_done
    step.save()