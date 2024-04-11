from typing import Optional

from django.contrib.auth import get_user_model
from django.db.models import QuerySet, Q, Count

from ..models import Team, Invitation

User = get_user_model()


def get_or_create_invitation(team: Team, users: Optional[QuerySet[User]]) -> str:
    if users is None:
        existing_invitations = Invitation.objects.filter(team=team, users__isnull=True)
    else:
        for user in users:
            existing_invitations = Invitation.objects.filter(team=team, users=user)

    if existing_invitations.exists():
        return existing_invitations.first().id

    invitation = Invitation.objects.create(team=team)
    if users is not None:
        invitation.users.set(users)

    return invitation.id
