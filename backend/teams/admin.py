from django.contrib import admin

from .models import Team, Member, Task, TaskTag, TaskStep


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "owner")
    search_fields = ("title", "description")
    empty_value_display = "-empty-"


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("pk", "user", "team", "is_admin")
    list_filter = ("is_admin",)
    empty_value_display = "-empty-"

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "status", "tag", "team")
    search_fields = ("title",)
    empty_value_display = "-empty-"

@admin.register(TaskTag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "color")
    search_fields = ("title",)

@admin.register(TaskStep)
class StepAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "is_done")
    search_fields = ("title", "is_done")
