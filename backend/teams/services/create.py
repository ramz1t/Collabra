import uuid
from typing import Optional

from django.contrib.auth import get_user_model
from django.core.files import File
from django.utils.text import slugify
from django.db import transaction

from ..models import Team, Member
from .images import prepare_icon


User = get_user_model()


def _create_admin(user: User, team: Team) -> None:
    Member.objects.create(user=user, team=team, is_admin=True)


def _generate_join_key() -> str:
    return str(uuid.uuid4())


@transaction.atomic
def create_team(user: User, **fields) -> Team:
    image: Optional[File] = fields.pop("image", None)
    if image is not None:
        image = prepare_icon(image, slugify(fields["title"]))

    team = Team.objects.create(
        owner=user,
        image=image,
        join_key_common=_generate_join_key(),
        join_key_selective=_generate_join_key(),
        **fields
    )

    _create_admin(user, team)

    return team
