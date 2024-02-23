from django.urls import path

from .api.views import TeamViewSet

app_name = "teams"

urlpatterns = [
    path("", TeamViewSet.as_view({"post": "create"})),
]
