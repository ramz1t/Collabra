from typing import List, Optional

from django.contrib.auth import get_user_model
from django.db import transaction
from django.core.files import File
from django.db.models import QuerySet
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError

from ..models import Link
from ._avatar_service import create_avatar, prepare_avatar

User = get_user_model()


def _create_link_objects(links: List[str]) -> QuerySet[Link]:
    Link.objects.bulk_create([Link(link=link) for link in links])
    return Link.objects.filter(link__in=links)


@transaction.atomic
def create_user(**fields) -> User:
    avatar: Optional[File] = fields.pop("avatar", None)
    links: Optional[List[str]] = fields.pop("links", None)

    if User.objects.filter(email=fields["email"]).exists():
        raise ValidationError({"email": [_("A user with this email already exists")]})

    user = User.objects.create_user(**fields)

    if links is not None:
        user.links.set(_create_link_objects(links))

    if avatar is None:
        avatar_img = create_avatar(
            fields["email"], fields["first_name"], fields["last_name"]
        )
    else:
        avatar_img = prepare_avatar(avatar, fields["email"])

    user.avatar = avatar_img
    user.save()
