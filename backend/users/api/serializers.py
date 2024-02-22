import re

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from drf_extra_fields.fields import Base64ImageField
from django.contrib.auth.password_validation import django_validate_password
from django.core import exceptions as django_exceptions
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from ..selectors import is_user_exists, get_user_links


def validate_new_password(field: str, password):
    try:
        django_validate_password(password)
    except django_exceptions.ValidationError as e:
        serializer_error = serializers.as_serializer_error(e)
        raise serializers.ValidationError({field, serializer_error})


def validate_old_password(user, old_password):
    if not user.check_password(old_password):
        raise ValidationError({"old_password": _("Password is incorrect")})


class UserRemoveSerializer(serializers.Serializer):
    old_password = serializers.CharField(style={"input_type": "password"})

    def validate(self, attrs):
        validate_old_password(self.context["request"].user, attrs["old_password"])
        return attrs


class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(style={"input_type": "password"})
    new_password = serializers.CharField(style={"input_type": "password"})

    def validate(self, attrs):
        validate_new_password("new_password", attrs["new_password"])
        validate_old_password(self.context["request"].user, attrs["old_password"])
        return attrs


class GeneratedAvatarSerializer(serializers.Serializer):
    first_color = serializers.CharField()
    second_color = serializers.CharField()


class UserCreateUpdateBaseSerializer(serializers.Serializer):
    avatar = Base64ImageField(required=False, allow_null=True)
    description = serializers.CharField(min_length=1, max_length=500, required=False)
    timezone = serializers.FloatField(required=False)
    links = serializers.ListSerializer(
        child=serializers.URLField(), max_length=10, required=False
    )

    def _validate_name(self, name) -> bool:
        pattern = re.compile(r"^[a-zA-Z\s]+$")
        return bool(pattern.match(name))

    def validate_first_name(self, first_name):
        if not self._validate_name(first_name):
            raise ValidationError(_("Name must contain only Latin letters or spaces"))
        return first_name

    def validate_last_name(self, last_name):
        if not self._validate_name(last_name):
            raise ValidationError(
                _("Surname must contain only Latin letters or spaces")
            )
        return last_name

    def validate_email(self, email):
        if is_user_exists(email=email):
            raise serializers.ValidationError(_("User with this email already exists"))
        return email

    def validate_timezone(self, timezone):
        if timezone not in settings.TIMEZONES:
            raise ValidationError(_("Invalid timezone format"))
        return timezone


class UserUpdateSerializer(UserCreateUpdateBaseSerializer):
    first_name = serializers.CharField(min_length=1, max_length=50, required=False)
    last_name = serializers.CharField(min_length=1, max_length=50, required=False)
    email = serializers.EmailField(min_length=5, max_length=254, required=False)
    username = serializers.CharField(min_length=5, max_length=50, required=False)

    def validate_username(self, username):
        prepared_username = username.replace(" ", "_").replace("-", "_").lower()
        cleaned_username = re.sub(r"_+", "_", prepared_username)

        if is_user_exists(username=cleaned_username):
            raise ValidationError(_("User with this username already exists"))

        if not re.match(r"^[a-zA-Z0-9_]+$", cleaned_username):
            raise ValidationError(
                _(
                    "Username must contain only Latin letters, space, hyphen and underscore"
                )
            )

        return cleaned_username


class UserCreateSerializer(UserCreateUpdateBaseSerializer):
    first_name = serializers.CharField(min_length=1, max_length=50)
    last_name = serializers.CharField(min_length=1, max_length=50)
    email = serializers.EmailField(min_length=5, max_length=254)
    password = serializers.CharField(style={"input_type": "password"})

    def validate_password(self, password):
        validate_new_password("password", password)
        return password


class UserRetrieveSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    avatar = Base64ImageField()
    generated_avatar = serializers.SerializerMethodField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    description = serializers.CharField()
    timezone = serializers.FloatField()
    links = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField()

    def get_generated_avatar(self, obj):
        serializer = GeneratedAvatarSerializer(instance=obj.generated_avatar)
        return serializer.data

    def get_links(self, obj):
        return get_user_links(obj)
