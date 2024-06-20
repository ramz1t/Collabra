from typing import Optional

from django.contrib.auth import get_user_model
from django.core.files import File
from django.utils.text import slugify
from django.db import transaction

from ...models import Team, Member
from ..images import prepare_icon
from .join import generate_join_keys


User = get_user_model()


def _create_admin(user: User, team: Team) -> None:
    Member.objects.create(user=user, team=team, is_admin=True)


@transaction.atomic
def create_team(user: User, **fields) -> Team:
    image: Optional[File] = fields.pop("image", None)
    if image is not None:
        image = prepare_icon(image, slugify(fields["title"]))

    join_keys = generate_join_keys()

    team = Team.objects.create(
        owner=user,
        image=image,
        join_key_common=join_keys[0],
        join_key_selective=join_keys[1],
        **fields
    )

    _create_admin(user, team)

    return team
