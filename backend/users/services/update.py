from typing import Optional, List

from django.core.files import File
from django.db import transaction
from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied

from .common import create_links
from .images import prepare_avatar

User = get_user_model()


@transaction.atomic
def update_user(user: User, **fields) -> User:
    avatar: File | bool = fields.pop("avatar", False)
    links: Optional[List[str]] = fields.pop("links", None)

    for field, value in fields.items():
        setattr(user, field, value)

    if avatar:
        setattr(user, "avatar", prepare_avatar(avatar, user.email))
    if avatar is None:
        setattr(user, "avatar", None)

    if links is not None:
        user.links.all().delete()
        create_links(user, links)

    user.full_clean()
    user.save()

    return user
