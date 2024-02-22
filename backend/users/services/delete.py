from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied

User = get_user_model()


def delete_user(user: User) -> None:
    user.delete()
