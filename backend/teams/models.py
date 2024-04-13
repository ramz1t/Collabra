import secrets

from django.db import models
from django.contrib.auth import get_user_model
from autoslug import AutoSlugField

User = get_user_model()


class Member(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="members")
    team = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="members")
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}:{self.user.email}:{'admin' if self.is_admin else 'user'}"


class Team(models.Model):
    slug = AutoSlugField(max_length=200, unique=True, populate_from="title")
    image = models.ImageField(upload_to="team_images", null=True)
    title = models.CharField(max_length=150)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="teams")
    description = models.TextField(null=True)
    join_key_common = models.CharField(
        default=secrets.token_hex(16), unique=True, max_length=32
    )
    join_key_selective = models.CharField(
        default=secrets.token_hex(16), unique=True, max_length=32
    )
    invited_people = models.ManyToManyField(User, related_name="teams_invited_to")

    def __str__(self):
        return f"{self.id}:{self.owner.email}:{self.title}"
