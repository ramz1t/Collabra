from django.shortcuts import get_object_or_404
from django.db.models import QuerySet

from .models import Team


def get_team_or_404(team_id: int, **fields) -> Team:
    return get_object_or_404(Team, id=team_id, **fields)


def get_teams(**fields) -> QuerySet[Team]:
    return Team.objects.filter(**fields)
