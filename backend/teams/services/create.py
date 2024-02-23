from typing import Optional

from django.contrib.auth import get_user_model
from django.core.files import File
from django.utils.text import slugify
from django.conf import settings
from django.db import transaction

from ..models import Team, Role, Action, Member
from .images import prepare_icon


User = get_user_model()


def _create_default_roles(team: Team) -> None:
    for role_fields in settings.DEFAULT_ROLES:
        role = Role.objects.create(
            team=team,
            is_custom=False,
            title=role_fields["title"],
            color=role_fields["color"],
        )
        role.actions.set(Action.objects.filter(key__in=role_fields["actions"]))


def _create_owner_member(team: Team, user: User) -> None:
    admin_role = Role.objects.get(team=team, title="Admin")
    Member.objects.create(user=user, team=team, role=admin_role)


@transaction.atomic
def create_team(user: User, **fields) -> Team:
    image: Optional[File] = fields.pop("image", None)

    if image is not None:
        image = prepare_icon(image, slugify(fields["title"]))

    team = Team.objects.create(owner=user, image=image, **fields)

    _create_default_roles(team)
    _create_owner_member(team, user)

    return team
