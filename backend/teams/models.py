from django.db import models
from django.contrib.auth import get_user_model
from autoslug import AutoSlugField
from django.conf import settings

User = get_user_model()


class Member(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="members")
    team = models.ForeignKey("Team", on_delete=models.CASCADE, related_name="members")
    is_admin = models.BooleanField(default=False)
    status = models.CharField(null=True, default=None, max_length=36)

    def __str__(self):
        return f"{self.id}:{self.user.email}:{'admin' if self.is_admin else 'user'}"


class Team(models.Model):
    slug = AutoSlugField(max_length=200, unique=True, populate_from="title")
    image = models.ImageField(upload_to="team_images", null=True)
    title = models.CharField(max_length=150)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="teams")
    description = models.TextField(null=True)
    join_key_common = models.CharField(unique=True, max_length=36)
    join_key_selective = models.CharField(unique=True, max_length=36)
    invited_people = models.ManyToManyField(User, related_name="teams_invited_to")

    def __str__(self):
        return f"{self.id}:{self.owner.email}:{self.title}"


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=64, choices=settings.STATUS_CHOICES)
    deadline = models.DateTimeField(null=True)
    requires_review = models.BooleanField(default=False)
    tag = models.ForeignKey("TaskTag", null=True, on_delete=models.SET_NULL)
    assignee = models.ForeignKey(Member, related_name='assigned_tasks', null=True, on_delete=models.SET_NULL)
    creator = models.ForeignKey(Member, related_name='created_tasks', null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    team = models.ForeignKey(Team, related_name="tasks", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id}:{self.title}:{self.status}:for {self.assignee.id}:by {self.creator}: in {self.team.title}'


class TaskTag(models.Model):
    title = models.CharField(max_length=255)
    color = models.CharField(max_length=16)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="tags")

    def __str__(self):
        return f'{self.id}:{self.title}:{self.color}'


class TaskStep(models.Model):
    title = models.CharField(max_length=255)
    is_done = models.BooleanField(default=False)
    task = models.ForeignKey('Task', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id}:{self.title}:{self.is_done}:in {self.task.title}'
