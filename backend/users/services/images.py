from io import BytesIO

from PIL import Image
from django.conf import settings
from django.core.files import File


def _create_avatar_filename(email: str) -> str:
    return f"{email}.{settings.AVATAR['FORMAT'].lower()}"


def prepare_avatar(avatar: File, email: str) -> File:
    filename = _create_avatar_filename(email)
    img = Image.open(avatar)
    img.convert("RGB")
    img.resize(settings.AVATAR["SIZE"])
    thumb_io = BytesIO()
    img.save(thumb_io, settings.AVATAR["FORMAT"].upper())
    return File(thumb_io, name=filename)
