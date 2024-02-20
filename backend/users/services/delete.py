from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied

User = get_user_model()


def delete_user(request_user: User, user: User) -> None:
    if request_user != user:
        raise PermissionDenied()
    user.delete()
