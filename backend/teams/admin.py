from django.contrib import admin

from .models import Team, Member, Invitation


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("pk", "title", "owner", "color")
    search_fields = ("title", "description")
    empty_value_display = "-empty-"


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("pk", "user", "team", "is_admin")
    list_filter = ("is_admin",)
    empty_value_display = "-empty-"


@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
    list_display = ("pk", "team")
    search_fields = ("team__title", "user__username")
    empty_value_display = "-empty-"
