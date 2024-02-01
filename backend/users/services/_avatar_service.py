import random
from io import BytesIO

from django.conf import settings
from django.core.files import File
from PIL import Image, ImageDraw, ImageFont

avatar_settings = settings.AVATAR


def _create_avatar_filename(email: str) -> str:
    return f"{email}.{avatar_settings['FORMAT'].lower()}"


def create_avatar(email: str, first_name: str, last_name: str) -> File:
    filename = _create_avatar_filename(email)
    initials = first_name[0].upper() + last_name[0].upper()
    color = random.choice(avatar_settings["COLORS"]).upper()

    img = Image.new("RGB", avatar_settings["SIZE"], color=color)
    font = ImageFont.truetype(
        f"{avatar_settings['FONT_URL']}/{avatar_settings['FONT_FILE_NAME']}",
        size=avatar_settings["FONT_SIZE"],
    )
    draw_text = ImageDraw.Draw(img)

    text_box = draw_text.textbbox((0, 0), initials, font=font)
    text_width, text_height = text_box[2] - text_box[0], text_box[3] - text_box[1]

    center_x = img.width / 2
    text_x = center_x - text_width / 2

    draw_text.text(
        (text_x, 100),
        initials,
        font=font,
        fill=avatar_settings["FONT_FILL"],
    )

    thumb_io = BytesIO()
    img.save(thumb_io, avatar_settings["FORMAT"].upper())

    return File(thumb_io, name=filename)


def prepare_avatar(avatar: File, email: str):
    filename = _create_avatar_filename(email)

    img = Image.open(avatar)
    img.convert("RGB")
    img.resize(avatar_settings["SIZE"])
    thumb_io = BytesIO()
    img.save(thumb_io, avatar_settings["FORMAT"].upper())
    avatar = File(thumb_io, name=filename)

    return avatar
