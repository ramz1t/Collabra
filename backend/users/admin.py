from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import GeneratedAvatar, Link

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("pk", "is_staff", "email", "first_name", "last_name", "username")
    list_filter = ("is_staff",)
    search_fields = ("email", "first_name", "last_name", "username")
    empty_value_display = "-empty-"


@admin.register(GeneratedAvatar)
class GeneratedAvatarAdmin(admin.ModelAdmin):
    list_display = ("pk", "first_color", "second_color")
    empty_value_display = "-empty-"


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ("pk", "link")
    search_fields = ("link",)
    empty_value_display = "-empty-"
