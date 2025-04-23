from ...models import TaskTag

def delete_tag(tag: TaskTag) -> None:
    tag.delete()