from autoslug import AutoSlugField
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Member(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="members")
    team = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="members")
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}:{self.user.email}:{'admin' if self.is_admin else 'user'}"


class Team(models.Model):
    slug = AutoSlugField(populate_from="title", unique=True)
    image = models.ImageField(upload_to="team_images", null=True)
    title = models.CharField(max_length=150)
    color = models.CharField(max_length=6)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="teams")
    description = models.TextField(null=True)

    def __str__(self):
        return f"{self.id}:{self.owner.email}:{self.title}"
