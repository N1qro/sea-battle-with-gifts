from django.db.models import Sum

import game.models


def is_game_end(current_game: game.models.Game) -> bool:
    if (
        game.models.Ship.objects.filter(
            game=current_game,
            is_alive=True,
        ).count()
        == 0
    ):
        return False

    if (
        game.models.Cell.objects.filter(
            game=current_game,
            status__in=[0, 2],
        ).count()
        == 0
    ):
        return False

    if (
        game.models.UserShots.objects.filter(game=current_game).aggregate(
            count=Sum("count"),
        )["count"]
        == 0
    ):
        return False

    return True
