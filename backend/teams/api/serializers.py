from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError

from ..selectors import do_users_exist, are_users_not_members_of_team


class TeamListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    slug = serializers.SlugField()
    title = serializers.CharField()
    image = Base64ImageField()


class TeamCreateSerializer(serializers.Serializer):
    image = Base64ImageField(required=False)
    title = serializers.CharField(max_length=100)
    color = serializers.CharField(
        min_length=6, max_length=6, default=settings.DEFAULT_TEAM_COLOR
    )
    description = serializers.CharField(max_length=1000, required=False)


class TeamDeleteSerializer(serializers.Serializer):
    password = serializers.CharField(style={"input_type": "password"})

    def validate_password(self, password):
        if not self.context["request"].user.check_password(password):
            raise ValidationError(_("Password is incorrect"))


class TeamJoinSerializer(serializers.Serializer):
    users = serializers.ListField(
        child=serializers.IntegerField(),
        allow_null=True,
        allow_empty=False,
        max_length=100,
    )

    def validate_users(self, users):
        if users is not None:
            if not do_users_exist(users):
                raise ValidationError(_("No users with these ids were found"))
            if users.count(self.context["request"].user.id) > 0:
                raise ValidationError(_("You can't add yourself to an invitation"))
            if are_users_not_members_of_team(users, self.context["team"]):
                raise ValidationError(_("Some users are already on the team"))
        return users
