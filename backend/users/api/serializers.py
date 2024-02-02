from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from drf_extra_fields.fields import Base64ImageField
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions as django_exceptions
from django.utils.translation import gettext_lazy as _
from django.conf import settings

User = get_user_model()


class UserCreateUpdateBaseSerializer(serializers.Serializer):
    avatar = Base64ImageField(required=False, allow_null=True)
    description = serializers.CharField(min_length=1, max_length=500, required=False)
    timezone = serializers.FloatField(required=False)
    links = serializers.ListSerializer(
        child=serializers.URLField(), max_length=10, required=False
    )

    def validate_timezone(self, timezone):
        if timezone not in settings.TIMEZONES:
            raise ValidationError(_("Invalid timezone format"))
        return timezone


class UserUpdateSerializer(UserCreateUpdateBaseSerializer):
    first_name = serializers.CharField(min_length=1, max_length=150, required=False)
    last_name = serializers.CharField(min_length=1, max_length=150, required=False)
    email = serializers.EmailField(min_length=5, max_length=254, required=False)


class UserCreateSerializer(UserCreateUpdateBaseSerializer):
    first_name = serializers.CharField(min_length=1, max_length=150)
    last_name = serializers.CharField(min_length=1, max_length=150)
    email = serializers.EmailField(min_length=5, max_length=254)
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    def validate_password(self, password):
        try:
            validate_password(password)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(serializer_error)

        return password


class GeneratedAvatarSerializer(serializers.Serializer):
    first_color = serializers.CharField()
    second_color = serializers.CharField()


class UserRetrieveSerializer(serializers.Serializer):
    id = serializers.IntegerField()
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
        return [link.link for link in obj.links.all()]
