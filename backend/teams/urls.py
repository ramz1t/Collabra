from django.urls import path

from .api.views.stats import StatsViewSet
from .api.views.teams import TeamViewSet
from .api.views.members import MemberViewSet
from .api.views.tasks import TaskViewSet
from .api.views.tags import TagViewSet
from .api.views.steps import StepViewSet

app_name = "teams"

urlpatterns = [
    path("", TeamViewSet.as_view({"post": "create", "get": "list"})),
    path(
        "<int:pk>/",
        TeamViewSet.as_view({"delete": "remove", "patch": "partial_update"}),
    ),
    path("<str:slug>/", TeamViewSet.as_view({"get": "retrieve"})),
    path("<str:slug>/join-info/", TeamViewSet.as_view({"get": "retrieve_short"})),
    path("<str:slug>/stats/", StatsViewSet.as_view({"get": "retrieve"})),
    path("<int:pk>/get-join-keys/", TeamViewSet.as_view({"get": "get_join_keys"})),
    path(
        "<int:pk>/refresh-join-keys/",
        TeamViewSet.as_view({"patch": "refresh_join_keys"}),
    ),
    path("<int:pk>/exit/", TeamViewSet.as_view({"delete": "exit"})),
    path("<int:pk>/transfer/", TeamViewSet.as_view({"patch": "transfer"})),
    path("<int:pk>/invite/", MemberViewSet.as_view({"patch": "invite"})),
    path(
        "<int:pk>/remove-from-invited/",
        MemberViewSet.as_view({"patch": "remove_from_invited"}),
    ),
    path("<str:slug>/join/<str:key>/", MemberViewSet.as_view({"post": "join"})),
    path(
        "<int:pk>/get-users-to-invite/<str:info>/",
        MemberViewSet.as_view({"get": "get_users_to_invite"}),
    ),
    path(
        "<int:pk>/members/",
        MemberViewSet.as_view({"get": "list", "delete": "multiple_remove"}),
    ),
    path(
        "<int:team_pk>/members/<int:member_pk>/",
        MemberViewSet.as_view({"patch": "partial_update"}),
    ),
    path(
        "<str:slug>/tasks/",
        TaskViewSet.as_view({"get": "list", "post": "create", "delete": "remove",})
    ),
    path(
        "<str:slug>/tasks/<int:pk>/",
        TaskViewSet.as_view({"get": "retrieve", "patch": "partial_update"}),
    ),
    path(
        "<str:slug>/tags/",
        TagViewSet.as_view({"get": "list", "post": "create"}),
    ),
    path(
        "<str:slug>/tags/<int:pk>/",
        TagViewSet.as_view({"delete": "remove", "patch": "update"}),
    ),
    path(
        "<str:slug>/tasks/<int:task_pk>/steps/",
        StepViewSet.as_view({"get": "list"})
    ),
    path(
        "<str:slug>/tasks/<int:task_pk>/steps/<int:step_pk>/toggle/",
        StepViewSet.as_view({"patch": "toggle"})
    )
]
