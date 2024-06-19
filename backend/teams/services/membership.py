from typing import Iterable

from django.shortcuts import get_object_or_404
from django.db.models.query import QuerySet

from ..models import Team, Member


def multiple_remove(
    team: int | Team, members: Iterable[int] | QuerySet[Member]
) -> None:
    if isinstance(team, int):
        team = get_object_or_404(Team, pk=team)
    if not isinstance(members, QuerySet):
        members = Member.objects.filter(id__in=members)

    members.filter(team=team).delete()
