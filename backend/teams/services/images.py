from django.conf import settings
from django.core.files import File

from core.utils import prepare_image


def _create_icon_filename(email: str) -> str:
    return f"{email}.{settings.AVATAR['FORMAT'].lower()}"


def prepare_icon(icon: File, slug: str) -> File:
    filename = _create_icon_filename(slug)
    return prepare_image(icon, filename)
