from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError

from .members import InvitedUserListSerializer
from .. import fields
from ... import selectors


class TeamListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    slug = serializers.SlugField()
    title = serializers.CharField()
    image = serializers.ImageField()


class TeamRetrieveSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    slug = serializers.SlugField()
    image = serializers.ImageField()
    title = serializers.CharField()
    description = serializers.CharField()
    is_admin = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()
    member_id = serializers.SerializerMethodField()
    member_status = serializers.SerializerMethodField()

    def get_is_admin(self, team):
        return selectors.is_user_admin_by_team(self.context["user"], team)

    def get_is_owner(self, team):
        return selectors.is_user_owner_by_team(team, self.context["user"])

    def get_member_id(self, team):
        return selectors.get_member_or_404(user=self.context["user"], team=team).id

    def get_member_status(self, team):
        return selectors.get_member_or_404(user=self.context["user"], team=team).status


class TeamShortRetrieveSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    slug = serializers.SlugField()
    image = serializers.ImageField()
    title = serializers.CharField()
    description = serializers.CharField()
    is_member = serializers.SerializerMethodField()

    def get_is_member(self, team):
        return selectors.is_user_member_by_team(team, self.context["user"])


class TeamCreateUpdateSerializer(serializers.Serializer):
    image = serializers.ImageField(required=False, allow_null=True)
    description = serializers.CharField(
        max_length=1000, required=False, allow_null=True, allow_blank=True
    )

    def validate_title(self, title):
        if title.isdigit():
            raise ValidationError(_("Title cannot consist only of numbers"))

        return title


class TeamCreateSerializer(TeamCreateUpdateSerializer):
    title = serializers.CharField(max_length=100)


class TeamUpdateSerializer(TeamCreateUpdateSerializer):
    title = serializers.CharField(max_length=100, required=False)


class TeamDeleteSerializer(serializers.Serializer):
    password = fields.PasswordField()


class JoinKeysRetrieveSerializer(serializers.Serializer):
    join_key_common = serializers.CharField()
    join_key_selective = serializers.CharField()
    invited_people = serializers.SerializerMethodField()

    def get_invited_people(self, team):
        return InvitedUserListSerializer(team.invited_people, many=True).data


class TransferSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    password = fields.PasswordField()

    def validate_user(self, user_id):
        user = selectors.get_user_or_404(id=user_id)
        if not selectors.is_user_admin_by_team(user, self.context["team"]):
            raise ValidationError(_("You can only transfer the group to an admin"))

        return user


class LeaveSerializer(serializers.Serializer):
    password = fields.PasswordField()
