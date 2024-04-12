from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import QuerySet

from .models import Team


User = get_user_model()


def get_teams(**fields) -> QuerySet[Team]:
    return Team.objects.filter(**fields)


def get_team_or_404(team_id: int, **fields) -> Team:
    return get_object_or_404(Team, id=team_id, **fields)


def is_user_admin_by_team(user: User, team: Team) -> bool:
    return user.members.filter(team=team, is_admin=True).exists()


def is_user_member_by_team(team: Team, user: User) -> bool:
    return team.members.filter(user=user).exists()


def is_user_invited(user_id: int, team: Team) -> bool:
    return team.invited_people.filter(id=user_id).exists()
