from django.urls import path

from .api.views import TeamViewSet

app_name = "teams"

urlpatterns = [
    path("", TeamViewSet.as_view({"post": "create", "get": "list"})),
    path("<int:pk>/", TeamViewSet.as_view({"delete": "remove"})),
    path("<str:slug>/", TeamViewSet.as_view({"get": "retrieve"})),
    path("join-info/<str:slug>/", TeamViewSet.as_view({"get": "retrieve_short"})),
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
    path("<str:slug>/join/<str:key>/", TeamViewSet.as_view({"post": "join"})),
    path(
        "<int:pk>/get-users-to-invite/<str:info>/",
        TeamViewSet.as_view({"get": "get_users_to_invite"}),
    ),
]
