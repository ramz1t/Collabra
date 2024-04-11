from django.urls import path

from .api.views import TeamViewSet

app_name = "teams"

urlpatterns = [
    path("", TeamViewSet.as_view({"post": "create", "get": "list"})),
    path("<int:pk>/", TeamViewSet.as_view({"delete": "remove"})),
    path("<int:pk>/get-join-link/", TeamViewSet.as_view({"get": "get_join_link"})),
    path("<int:pk>/users-to-invite/", TeamViewSet.as_view({"get": "users_to_invite"})),
]
