from typing import List

from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import QuerySet

from .models import Team, Member


User = get_user_model()


def get_teams(**fields) -> QuerySet[Team]:
    return Team.objects.filter(**fields)


def get_users_by_ids(user_ids: List[int]) -> QuerySet[User]:
    return User.objects.filter(id__in=user_ids)


def get_team_or_404(team_id: int, **fields) -> Team:
    return get_object_or_404(Team, id=team_id, **fields)


def do_users_exist(users_ids: List[int]) -> bool:
    cleaned_ids = set(users_ids)
    return len(User.objects.filter(id__in=cleaned_ids)) == len(cleaned_ids)


def are_users_not_members_of_team(users_ids: List[int], team: Team) -> bool:
    return User.objects.filter(id__in=users_ids, members__team=team).exists()


def is_user_admin_by_team(user: User, team: Team) -> bool:
    return user.members.filter(team=team, is_admin=True).exists()
