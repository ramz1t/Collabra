import django.core.exceptions
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError, PermissionDenied

from ... import selectors
from ...models import Team


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


class ListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    is_admin = serializers.BooleanField()
    is_owner = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def get_is_owner(self, member):
        return selectors.is_user_owner_by_team(self.context["team"], member.user)

    def get_user(self, member):
        return UserSerializer(instance=member.user).data


class MultipleRemoveSerializer(serializers.Serializer):
    members = serializers.ListField(child=serializers.IntegerField())

    def validate_members(self, members_ids):
        team = self.context["request"].team
        me = self.context["request"].user

        if not selectors.are_members_exist(team, members_ids):
            raise ValidationError(_("Such members do not exist"))
        if selectors.is_owner_in_members(team, members_ids):
            raise ValidationError(_("Cannot remove team owner"))
        if selectors.am_i_in_members(team, me, members_ids):
            raise ValidationError(_("Cannot remove yourself"))

        return members_ids


class PartialUpdateSerializer(serializers.Serializer):
    is_admin = serializers.BooleanField(required=False)
