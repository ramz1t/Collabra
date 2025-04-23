from ...models import TaskTag

def update_tag(tag: TaskTag, **fields) -> TaskTag:
    for field, value in fields.items():
        setattr(tag, field, value)
    tag.save()

    return tag