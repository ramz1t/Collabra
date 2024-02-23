from rest_framework.response import Response
from rest_framework import status

from . import mixins
from . import serializers
from ..services.create import create_team


class TeamViewSet(mixins.TeamMixin):
    def create(self, request):
        serializer = serializers.TeamCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_team(request.user, **serializer.validated_data)
        data = {"message": "Team created"}
        return Response(data, status=status.HTTP_201_CREATED)
