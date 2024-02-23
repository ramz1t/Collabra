from io import BytesIO

from PIL import Image
from django.conf import settings
from django.core.files import File


def prepare_image(image: File, filename: str) -> File:
    img = Image.open(image)
    img.convert("RGB")
    img.resize(settings.AVATAR["SIZE"])
    thumb_io = BytesIO()
    img.save(thumb_io, settings.AVATAR["FORMAT"].upper())
    return File(thumb_io, name=filename)
