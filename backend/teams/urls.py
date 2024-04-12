from django.urls import path

from .api.views import TeamViewSet

app_name = "teams"

urlpatterns = [
    path("", TeamViewSet.as_view({"post": "create", "get": "list"})),
    path("<int:pk>/", TeamViewSet.as_view({"delete": "remove"})),
    path("<int:pk>/get-join-keys/", TeamViewSet.as_view({"get": "get_join_keys"})),
    path(
        "<int:pk>/refresh-join-keys/",
        TeamViewSet.as_view({"patch": "refresh_join_keys"}),
    ),
    path("<int:pk>/invite/", TeamViewSet.as_view({"patch": "invite"})),
    path(
        "<int:pk>/remove-from-invited/",
        TeamViewSet.as_view({"patch": "remove_from_invited"}),
    ),
    path("<int:pk>/join/<str:key>/", TeamViewSet.as_view({"post": "join"})),
]
