from rest_framework import serializers


class TagListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    color = serializers.CharField()


class TagCreateUpdateSerializer(serializers.Serializer):
    title = serializers.CharField()
    color = serializers.CharField()