from django.urls import path

from .api.views import UsersViewSet

app_name = "users"

urlpatterns = [
    path("", UsersViewSet.as_view({"post": "create"})),
    path(
        "<int:pk>/",
        UsersViewSet.as_view(
            {"get": "retrieve", "delete": "delete", "patch": "update"}
        ),
    ),
]
