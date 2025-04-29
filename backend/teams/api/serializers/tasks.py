from rest_framework import serializers

from .members import ListSerializer as MemberListSerializer
from ...selectors import get_steps


class TagListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    color = serializers.CharField()


class TaskStepListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    is_done = serializers.BooleanField()


class TaskCreateSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    requires_review = serializers.BooleanField()
    tag = serializers.IntegerField(allow_null=True)
    status = serializers.CharField()
    steps = serializers.ListField(child=serializers.CharField())
    assignee = serializers.IntegerField()


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    requires_review = serializers.BooleanField()
    tag = serializers.SerializerMethodField()
    deadline = serializers.DateTimeField()
    status = serializers.CharField()
    steps = serializers.SerializerMethodField()
    assignee = serializers.SerializerMethodField()
    attachments = serializers.SerializerMethodField()
    messages_count = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_tag(self, task):
        if task.tag is None:
            return None
        serializer = TagListSerializer(instance=task.tag)
        return serializer.data

    def get_steps(self, task):
        steps = get_steps(task=task)
        if steps is None:
            return []
        serializer = TaskStepListSerializer(instance=steps, many=True)
        return serializer.data

    def get_assignee(self, task):
        serializer = MemberListSerializer(instance=task.assignee, context={'team': self.context['team']})
        return serializer.data

    def get_attachments(self, task):
        return []

    def get_messages_count(self, task):
        return 0


class TaskDeleteSerializer(serializers.Serializer):
    id = serializers.ListField(
        child=serializers.IntegerField(), required=False
    )
    status = serializers.CharField(required=False)


class TagCreateUpdateSerializer(serializers.Serializer):
    title = serializers.CharField()
    color = serializers.CharField()
