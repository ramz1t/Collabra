from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from drf_extra_fields.fields import Base64ImageField
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions as django_exceptions
from django.utils.translation import gettext_lazy as _

User = get_user_model()

_integer_timezones = [i for i in range(-12, 15)]
_float_timezones = [-9.5, -3.5, 3.5, 4.5, 5.5, 5.75, 6.5, 8.75, 9.5, 10.5, 12.75]
timezones = _integer_timezones + _float_timezones


class UserCreateSerializer(serializers.Serializer):
    first_name = serializers.CharField(min_length=1, max_length=150)
    last_name = serializers.CharField(min_length=1, max_length=150)
    email = serializers.EmailField(min_length=5, max_length=254)
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    avatar = Base64ImageField(required=False)
    description = serializers.CharField(min_length=1, max_length=500, required=False)
    timezone = serializers.FloatField(required=False)
    links = serializers.ListSerializer(
        child=serializers.CharField(), min_length=1, max_length=10, required=False
    )

    def validate_password(self, password):
        try:
            validate_password(password)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(serializer_error)

        return password

    def validate_timezone(self, timezone):
        if timezone not in timezones:
            raise ValidationError(_("Invalid timezone format"))
        return timezone


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
        print(timezones)
        return [link.link for link in obj.links.all()]
