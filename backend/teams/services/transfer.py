def transfer_team(team, user_to) -> None:
    team.owner = user_to
    team.save()
