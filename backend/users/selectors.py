from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

User = get_user_model()


def get_user_or_404(request_user: User, user_id: int, **fields) -> User:
    if request_user.id != user_id:
        raise PermissionDenied()
    return get_object_or_404(User, id=user_id, **fields)


def is_user_exists(**fields) -> bool:
    return User.objects.filter(**fields).exists()
