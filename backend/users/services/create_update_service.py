import random
from typing import List, Optional, Tuple
from io import BytesIO

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction
from django.core.files import File
from django.db.models import QuerySet
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError
from PIL import Image

from ..models import Link, GeneratedAvatar

User = get_user_model()


def _create_link_objects(links: List[str]) -> QuerySet[Link]:
    Link.objects.bulk_create([Link(link=link) for link in links])
    return Link.objects.filter(link__in=links)


def _choice_avatar_colors() -> Tuple[str, str]:
    first_color = random.choice(settings.AVATAR["COLORS"])
    second_color = random.choice(settings.AVATAR["COLORS"])
    return first_color, second_color


def _create_generated_avatar_object() -> GeneratedAvatar:
    first_color, second_color = _choice_avatar_colors()
    return GeneratedAvatar.objects.create(
        first_color=first_color, second_color=second_color
    )


def _create_avatar_filename(email: str) -> str:
    return f"{email}.{settings.AVATAR['FORMAT'].lower()}"


def _prepare_avatar(avatar: File, email: str) -> File:
    filename = _create_avatar_filename(email)
    img = Image.open(avatar)
    img.convert("RGB")
    img.resize(settings.AVATAR["SIZE"])
    thumb_io = BytesIO()
    img.save(thumb_io, settings.AVATAR["FORMAT"].upper())
    avatar = File(thumb_io, name=filename)
    return avatar


@transaction.atomic
def create_user(**fields) -> User:
    avatar: Optional[File] = fields.pop("avatar", None)
    links: Optional[List[str]] = fields.pop("links", None)

    if User.objects.filter(email=fields["email"]).exists():
        raise ValidationError({"email": [_("User with this email already exists")]})

    generated_avatar = _create_generated_avatar_object()

    user = User.objects.create_user(generated_avatar=generated_avatar, **fields)

    if links is not None:
        user.links.set(_create_link_objects(links))

    if avatar is not None:
        user.avatar = _prepare_avatar(avatar, fields["email"])
        user.save()

    return user


@transaction.atomic
def update_user(user: User, **fields) -> User:
    avatar: File | bool = fields.pop("avatar", False)
    links: Optional[List[str]] = fields.pop("links", None)

    if fields.get("email", None) is not None:
        if User.objects.filter(email=fields["email"]).exists():
            raise ValidationError({"email": [_("User with this email already exists")]})

    for field, value in fields.items():
        setattr(user, field, value)

    if links is not None:
        user.links.all().delete()
        if len(links) != 0:
            user.links.set(_create_link_objects(links))

    if avatar:
        user.avatar = _prepare_avatar(avatar, user.email)
    elif avatar is None:
        user.avatar = None

    user.full_clean()
    user.save()
    return user
