from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import QuerySet, Subquery, OuterRef, Q

from .models import Team, Member


User = get_user_model()


def get_teams(**fields) -> QuerySet[Team]:
    return Team.objects.filter(**fields)


def get_team_or_404(**fields) -> Team:
    return get_object_or_404(Team, **fields)


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
