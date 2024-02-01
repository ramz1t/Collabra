from django.contrib import admin

from .models import User, GeneratedAvatar, Link


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("pk", "is_staff", "email", "first_name", "last_name")
    list_filter = ("is_staff",)
    search_fields = ("email", "first_name", "last_name")
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
