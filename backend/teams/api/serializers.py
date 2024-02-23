from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from django.conf import settings


class TeamCreateSerializer(serializers.Serializer):
    image = Base64ImageField(required=False)
    title = serializers.CharField(max_length=100)
    color = serializers.CharField(
        min_length=6, max_length=6, default=settings.DEFAULT_TEAM_COLOR
    )
    description = serializers.CharField(max_length=1000, required=False)
