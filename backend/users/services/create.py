import random
from typing import Optional, List

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files import File
from django.db import transaction

from .common import create_links
from .images import prepare_avatar
from ..models import GeneratedAvatar

User = get_user_model()


def _generate_username_postfix() -> str:
    user_postfix_min = settings.USERNAME_POSTFIX_RANGE[0]
    user_postfix_max = settings.USERNAME_POSTFIX_RANGE[1]
    return str(random.randint(user_postfix_min, user_postfix_max))


def _generate_username(first_name: str, last_name: str) -> str:
    joint_name = (first_name + last_name).replace(" ", "").lower()
    postfix = _generate_username_postfix()

    while User.objects.filter(username=joint_name + postfix).exists():
        postfix = _generate_username_postfix()

    return joint_name + postfix


def _create_generated_avatar() -> GeneratedAvatar:
    first_color = random.choice(settings.AVATAR["COLORS"])
    second_color = random.choice(settings.AVATAR["COLORS"])
    return GeneratedAvatar.objects.create(
        first_color=first_color, second_color=second_color
    )


@transaction.atomic
def create_user(**fields) -> User:
    avatar: Optional[File] = fields.pop("avatar", None)
    links: Optional[List[str]] = fields.pop("links", None)

    user = User.objects.create_user(
        avatar=prepare_avatar(avatar, fields["email"]),
        generated_avatar=_create_generated_avatar(),
        username=_generate_username(fields["first_name"], fields["last_name"]),
        **fields,
    )
    if links is not None:
        create_links(user, links)

    return user
