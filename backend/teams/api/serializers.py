from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError

from . import fields
from .. import selectors


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

    def get_is_admin(self, team):
        return selectors.is_user_admin_by_team(self.context["user"], team)

    def get_is_owner(self, team):
        return selectors.is_user_owner_by_team(team, self.context["user"])


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
        max_length=1000, required=False, allow_null=True
    )


class TeamCreateSerializer(TeamCreateUpdateSerializer):
    title = serializers.CharField(max_length=100)


class TeamUpdateSerializer(TeamCreateUpdateSerializer):
    title = serializers.CharField(max_length=100, required=False)


class TeamDeleteSerializer(serializers.Serializer):
    password = fields.PasswordField()


class GeneratedAvatarRetrieveSerializer(serializers.Serializer):
    first_color = serializers.CharField()
    second_color = serializers.CharField()


class InvitedUserListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    avatar = serializers.ImageField()
    generated_avatar = serializers.SerializerMethodField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    is_invited = serializers.SerializerMethodField()

    def get_is_invited(self, user):
        return True

    def get_generated_avatar(self, user):
        return GeneratedAvatarRetrieveSerializer(instance=user.generated_avatar).data


class JoinKeysRetrieveSerializer(serializers.Serializer):
    join_key_common = serializers.CharField()
    join_key_selective = serializers.CharField()
    invited_people = serializers.SerializerMethodField()

    def get_invited_people(self, team):
        return InvitedUserListSerializer(team.invited_people, many=True).data


class InviteSerializer(serializers.Serializer):
    user = serializers.IntegerField()

    def validate_user(self, user_id):
        if selectors.is_user_invited(user_id, self.context["team"]):
            raise ValidationError(_("User already invited"))
        if self.context["user"].id == user_id:
            raise ValidationError(_("You can't invite yourself"))
        return user_id


class RemoveFromInvitedSerializer(serializers.Serializer):
    user = serializers.IntegerField()

    def validate_user(self, user_id):
        if not selectors.is_user_invited(user_id, self.context["team"]):
            raise ValidationError(_("User has not yet been invited"))
        return user_id


class JoinSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=64, min_length=32)

    def validate(self, attrs):
        key = attrs["key"]
        team = self.context["team"]
        user = self.context["user"]

        if key != team.join_key_common and key != team.join_key_selective:
            raise ValidationError(_("Invalid key"))
        if selectors.is_user_member_by_team(team, user):
            raise ValidationError(_("You are already on this team"))

        return attrs


class TransferSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    password = fields.PasswordField()

    def validate_user(self, user_id):
        user = selectors.get_user_or_404(id=user_id)
        if not selectors.is_user_admin_by_team(user, self.context["team"]):
            raise ValidationError(_("You can only transfer the group to an admin"))

        return user


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    avatar = serializers.ImageField()
    generated_avatar = serializers.SerializerMethodField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    email = serializers.CharField()

    def get_generated_avatar(self, user):
        return GeneratedAvatarRetrieveSerializer(instance=user.generated_avatar).data


class UserToInviteListSerializer(UserSerializer):
    is_invited = serializers.SerializerMethodField()
    is_member = serializers.SerializerMethodField()

    def get_is_invited(self, user):
        return selectors.is_user_invited(user.id, self.context["team"])

    def get_is_member(self, user):
        return selectors.is_user_member_by_team(self.context["team"], user)


class MemberListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    is_admin = serializers.BooleanField()
    is_owner = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def get_is_owner(self, member):
        return selectors.is_user_owner_by_team(self.context["team"], member.user)

    def get_user(self, member):
        return UserSerializer(instance=member.user).data
