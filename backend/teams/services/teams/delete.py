from ...models import Team


def delete_team(team: Team) -> None:
    team.delete()
