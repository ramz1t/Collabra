from rest_framework import serializers

from .members import ListSerializer as MemberListSerializer
from .tags import TagListSerializer
from ...selectors import get_steps


class TaskStepListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    is_done = serializers.BooleanField()


class TaskStepUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    title = serializers.CharField()


class TaskCreateSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=150)
    description = serializers.CharField(max_length=750)
    requires_review = serializers.BooleanField()
    tag = serializers.IntegerField(allow_null=True)
    status = serializers.CharField()
    steps = serializers.ListField(child=serializers.CharField())
    assignee = serializers.IntegerField()
    deadline = serializers.DateField(allow_null=True)


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    requires_review = serializers.BooleanField()
    tag = serializers.SerializerMethodField()
    deadline = serializers.DateField()
    status = serializers.CharField()
    steps_count = serializers.SerializerMethodField()
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

    def get_steps_count(self, task):
        steps = get_steps(task=task)
        if steps is None:
            return 0
        return len(steps)

    def get_assignee(self, task):
        if not task.assignee:
            return None
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
