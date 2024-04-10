from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError


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
