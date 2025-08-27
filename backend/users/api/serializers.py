import re

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from timezone_field.rest_framework import TimeZoneSerializerField
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions as django_exceptions
from django.utils.translation import gettext_lazy as _

from ..selectors import is_user_exists, get_user_links


def validate_new_password(field: str, password):
    try:
        validate_password(password)
    except django_exceptions.ValidationError as e:
        serializer_error = serializers.as_serializer_error(e)
        raise serializers.ValidationError({field, serializer_error})


def validate_old_password(user, old_password, field: str = "old_password"):
    if not user.check_password(old_password):
        raise ValidationError({field: _("Password is incorrect")})


class UserRemoveSerializer(serializers.Serializer):
    password = serializers.CharField(style={"input_type": "password"})

    def validate(self, attrs):
        validate_old_password(self.context["request"].user, attrs["password"], field="password")
        return attrs


class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(style={"input_type": "password"})
    new_password = serializers.CharField(style={"input_type": "password"})

    def validate(self, attrs):
        validate_new_password("new_password", attrs["new_password"])
        validate_old_password(self.context["request"].user, attrs["old_password"], field="old_password")
        return attrs


class GeneratedAvatarSerializer(serializers.Serializer):
    first_color = serializers.CharField()
    second_color = serializers.CharField()


class UserCreateUpdateBaseSerializer(serializers.Serializer):
    avatar = serializers.ImageField(required=False, allow_null=True)
    description = serializers.CharField(
        min_length=1, max_length=500, required=False, allow_null=True
    )
    timezone = TimeZoneSerializerField(use_pytz=False, required=False, allow_null=True)
    links = serializers.ListSerializer(
        child=serializers.URLField(), max_length=10, required=False
    )

    def _validate_name(self, name) -> bool:
        pattern = re.compile(r"^[a-zA-Z\s]+$")
        return bool(pattern.match(name))

    def validate_first_name(self, first_name):
        if not self._validate_name(first_name):
            raise ValidationError(_("Name must contain only Latin letters A-Z or spaces"))
        return first_name.capitalize()

    def validate_last_name(self, last_name):
        if not self._validate_name(last_name):
            raise ValidationError(
                _("Surname must contain only Latin letters A-Z or spaces")
            )
        return last_name.capitalize()

    def validate_email(self, email):
        if is_user_exists(email=email):
            raise serializers.ValidationError(_("User with this email already exists"))
        return email


class UserUpdateSerializer(UserCreateUpdateBaseSerializer):
    first_name = serializers.CharField(min_length=1, max_length=50, required=False)
    last_name = serializers.CharField(min_length=1, max_length=50, required=False)
    email = serializers.EmailField(min_length=5, max_length=254, required=False)
    username = serializers.CharField(min_length=5, max_length=50, required=False)
    description = serializers.CharField(max_length=500, required=False, allow_null=True, allow_blank=True)

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
    avatar = serializers.ImageField()
    generated_avatar = serializers.SerializerMethodField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    description = serializers.CharField()
    timezone = TimeZoneSerializerField(use_pytz=True)
    links = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField()
    is_demo = serializers.BooleanField()

    def get_generated_avatar(self, obj):
        serializer = GeneratedAvatarSerializer(instance=obj.generated_avatar)
        return serializer.data

    def get_links(self, obj):
        return get_user_links(obj)
