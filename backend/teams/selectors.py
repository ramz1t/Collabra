from typing import Iterable, Sequence

from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.db.models.query import QuerySet

from .models import Team, Member


User = get_user_model()


def get_teams(**fields) -> QuerySet[Team]:
    return Team.objects.filter(**fields)


def get_team_or_404(**fields) -> Team:
    return get_object_or_404(Team, **fields)


def get_member_or_404(**fields) -> Member:
    return get_object_or_404(Member, **fields)


def get_team_members(team, **fields) -> QuerySet[Member]:
    return team.members.filter(**fields)


def is_user_admin_by_team(user: User, team: Team) -> bool:
    return user.members.filter(team=team, is_admin=True).exists()


def is_user_member_by_team(team: Team, user: User) -> bool:
    return team.members.filter(user=user).exists()


def is_user_owner_by_team(team: Team, user: User) -> bool:
    return team.owner == user


def is_user_invited(user_id: int, team: Team) -> bool:
    return team.invited_people.filter(id=user_id).exists()


def get_users_to_invite(info: str) -> User:
    return User.objects.filter(Q(email__iexact=info) | Q(username__iexact=info))


def get_user_or_404(**fields) -> User:
    return get_object_or_404(User, **fields)


def are_members_exist(
    team: Team | int, members: Sequence[int] | QuerySet[Member]
) -> bool:
    init_members_count = len(members)

    if isinstance(team, int):
        team = get_object_or_404(Team, id=team)
    if not isinstance(members, QuerySet):
        members = Member.objects.filter(id__in=members)

    existing_members = members.filter(team=team)

    return len(existing_members) == init_members_count


def is_owner_in_members(
    team: Team | int, members: Iterable[int] | QuerySet[Member]
) -> bool:
    if isinstance(team, int):
        team = get_object_or_404(Team, id=team)
    if not isinstance(members, QuerySet):
        members = Member.objects.filter(team=team, id__in=members)

    member_of_owner = Member.objects.get(team=team, user=team.owner)

    return members.contains(member_of_owner)


def am_i_in_members(
    team: Team | int, me: User, members: Iterable[int] | QuerySet[Member]
) -> bool:
    if isinstance(team, int):
        team = get_object_or_404(Team, id=team)
    if not isinstance(members, QuerySet):
        members = Member.objects.filter(id__in=members)

    me_member = Member.objects.get(team=team, user=me)

    return members.contains(me_member)
