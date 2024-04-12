import secrets

from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.db import transaction

from ..models import Team, Member


User = get_user_model()


def refresh_join_keys(team: Team) -> None:
    team.join_key_common = secrets.token_hex(16)
    team.join_key_selective = secrets.token_hex(16)
    team.save()


def invite(team: Team, user_id: int) -> None:
    user = get_object_or_404(User, id=user_id)
    team.invited_people.add(user)


def remove_from_invited(team: Team, user_id: int) -> None:
    user = get_object_or_404(User, id=user_id)
    team.invited_people.remove(user)


@transaction.atomic
def join(team: Team, key: str, user: User) -> None:
    if (
        key == team.join_key_selective
        and not team.invited_people.filter(id=user.id).exists()
    ):
        raise PermissionDenied()

    Member.objects.create(team=team, user=user)
    team.invited_people.remove(user)
