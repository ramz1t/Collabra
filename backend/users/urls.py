from django.urls import path

from .api.views import UsersViewSet

app_name = "users"

urlpatterns = [
    path("<int:pk>/", UsersViewSet.as_view({"get": "retrieve"})),
    path("", UsersViewSet.as_view({"post": "create"})),
    path("me/change-password/", UsersViewSet.as_view({"patch": "change_password"})),
    path(
        "me/",
        UsersViewSet.as_view({"get": "me", "delete": "remove", "patch": "update"}),
    ),
]
