from django.urls import path

from .api.views import UsersViewSet

app_name = "users"

urlpatterns = [
    path("", UsersViewSet.as_view({"post": "create"})),
]
