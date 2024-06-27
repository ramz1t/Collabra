from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.db import transaction

from users.models import User
from ... import selectors
from ...models import Team, Member


def _get_objects(
    team: Team | int, member: Member | int, me: User | int
) -> tuple[Team, Member, User]:
    if isinstance(team, int):
        team = get_object_or_404(Team, pk=team)
    if isinstance(member, int):
        member = get_object_or_404(Member, pk=member)
    if isinstance(me, int):
        me = get_object_or_404(User, username=me)

    return team, member, me


def _check_permissions(
    team: Team, member: Member, me: User, is_admin: bool | None, status: str | None
) -> None:
    if not selectors.is_user_admin_by_team(me, team): raise PermissionDenied()

    if (
        is_admin is not None
        and (
            me == member.user
            or selectors.is_user_owner_by_team(team, member.user)
        )
    ) or (
        status is not None
        and (selectors.is_user_owner_by_team(team, member.user) and me != member.user)
    ):
        raise PermissionDenied()


def _update_object(member: Member, **fields) -> Member:
    with transaction.atomic():
        for field, value in fields.items():
            setattr(member, field, value)
        member.save()

    return member


def update_member(
    team: Team | int, member: Member | int, me: User | int, **fields
) -> Member:
    team, member, me = _get_objects(team, member, me)

    is_admin = fields.get("is_admin", None)
    status = fields.get("status", None)
    _check_permissions(team, member, me, is_admin, status)

    return _update_object(member, **fields)
