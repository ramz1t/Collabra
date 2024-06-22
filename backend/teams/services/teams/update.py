from typing import Optional

from django.contrib.auth import get_user_model
from django.core.files import File
from django.utils.text import slugify

from ...models import Team
from ..images import prepare_icon


User = get_user_model()


def update_team(team: Team, **fields) -> Team:
    image: Optional[File] = fields.pop("image", team.image)
    if image is not None:
        image = prepare_icon(image, slugify(team.title))

    for field, value in fields.items():
        setattr(team, field, value)
    team.image = image
    team.save()

    return team
