from rest_framework import status
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _

from . import mixins
from .. import selectors
from ..services.create_service import create_user


class UsersViewSet(mixins.UserMixin):
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_user(**serializer.validated_data)
        data = {"message": _("User created")}
        return Response(data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk):
        user = selectors.get_user_or_404(request.user.id, pk)
        serializer = self.get_serializer(instance=user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
