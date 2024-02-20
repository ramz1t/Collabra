from typing import List

from django.contrib.auth import get_user_model

from ..models import UserLink

User = get_user_model()


def create_links(user: User, links: List[str]) -> None:
    UserLink.objects.bulk_create([UserLink(user=user, link=link) for link in links])
