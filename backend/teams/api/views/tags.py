from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _

from .. import mixins
from ... import selectors
from ..serializers import tasks as serializers
from ...services.tags.create import create_tag
from ...services.tags.delete import delete_tag
from ...selectors import get_team_or_404, get_tag_or_404
from ...services.tags.update import update_tag


class TagViewSet(mixins.TagMixin):
    def create(self, request, slug):
        team = get_team_or_404(slug=slug)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TagCreateUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tag = create_tag(team, **serializer.validated_data)

        response_data = serializers.TagListSerializer(
            instance=tag
        ).data
        response_data.update({'message': _('Tag created')})

        return Response(response_data, status=status.HTTP_201_CREATED)

    def update(self, request, slug, pk):
        team = get_team_or_404(slug=slug)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        serializer = serializers.TagCreateUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tag = get_tag_or_404(id=pk)

        update_tag(tag, **serializer.validated_data)

        response_data = serializers.TagListSerializer(
            instance=tag
        ).data
        response_data.update({'message': _('Tag updated')})

        return Response(response_data, status=status.HTTP_200_OK)


    def list(self, request, slug):
        team = get_team_or_404(slug=slug)
        if not selectors.is_user_member_by_team(team, request.user):
            raise PermissionDenied()

        tags = self.filter_queryset(selectors.get_tags(team=team))

        serializer = serializers.TagListSerializer(tags, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def remove(self, request, slug, pk):
        team = get_team_or_404(slug=slug)
        if not selectors.is_user_admin_by_team(request.user, team):
            raise PermissionDenied()

        tag = get_tag_or_404(pk=pk)

        delete_tag(tag)

        response_data = {"message": _("Tag deleted"), "id": pk}

        return Response(response_data, status=status.HTTP_200_OK)