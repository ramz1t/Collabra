from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Action(models.Model):
    key = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return f"{self.id}:{self.key}"


class Role(models.Model):
    title = models.CharField(max_length=150)
    team = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="roles")
    color = models.CharField(max_length=6)
    actions = models.ManyToManyField("Action", related_name="roles")
    is_custom = models.BooleanField()

    def __str__(self):
        return f"{self.id}:{self.title}:{'custom' if self.is_custom else 'default'}"


class Member(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="members")
    role = models.ForeignKey("Role", on_delete=models.PROTECT, related_name="members")
    team = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="members")

    def __str__(self):
        return f"{self.id}:{self.user.email}"


class Team(models.Model):
    image = models.ImageField(upload_to="team_images", null=True, blank=True)
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    color = models.CharField(max_length=6, default="ffffff")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="teams")
    description = models.TextField()

    def __str__(self):
        return f"Team<{self.id}:{self.owner.email}:{self.title}>"
