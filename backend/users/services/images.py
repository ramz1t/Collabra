from django.conf import settings
from django.core.files import File

from core.utils import prepare_image


def _create_avatar_filename(email: str) -> str:
    return f"{email}.{settings.AVATAR['FORMAT'].lower()}"


def prepare_avatar(avatar: File, email: str) -> File:
    filename = _create_avatar_filename(email)
    return prepare_image(avatar, filename)
