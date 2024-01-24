from http import HTTPStatus

from rest_framework import decorators
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

import game.models
import game.serializers
import users.models
import users.serializers


class GameNotStartedMixin:
    def update(self, request, pk, game_id=None):
        if game.models.Game.objects.get(id=game_id).status == 1:
            return self.update(request, pk)

        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)

    def destroy(self, request, pk, game_id=None):
        if game.models.Game.objects.get(id=game_id).status == 1:
            return self.destroy(request, pk)

        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)


class FullGameAPIView(APIView):
    """Get full game data for player"""

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        current_game = game.models.Game.objects.get(id=pk)
        cells = game.models.Cell.objects.filter(game=current_game)
        cell_serializer = game.serializers.CellSerializer(
            instance=cells,
            many=True,
        )

        game_serializer = game.serializers.GameSerializer(
            instance=current_game,
            context={"cells": cell_serializer.data},
        )
        return Response(game_serializer.data, status=HTTPStatus.OK)



class GameAPIView(
    ModelViewSet,
    GameNotStartedMixin,
):

    """
    GET - all games

    GET with pk - game with prizes

    POST - create game

    PUT - update game

    DELETE - delete game
    """

    permission_classes = [IsAdminUser]
    serializer_class = game.serializers.GameSerializer
    queryset = game.models.Game.objects.all()

    def list(self, request):
        games = game.models.Game.objects.all()
        game_serializer = game.serializers.GameSerializer(
            instance=games,
            many=True,
        )
        return Response(game_serializer.data, status=HTTPStatus.OK)

    @decorators.permission_classes([IsAuthenticated])
    def retrieve(self, request, pk=None):
        current_game = game.models.Game.objects.get(id=pk)
        cells = game.models.Cell.objects.filter(game=current_game)

        if request.user.is_superuser:
            cell_serializer = game.serializers.CellWithShipSerializer(
                instance=cells,
                many=True,
            )
        
        else:
            cell_serializer = game.serializers.CellSerializer(
                instance=cells.filter(status__in=[0, 1, 3]),
                many=True,
            )

        game_serializer = game.serializers.GameSerializer(
            instance=current_game,
            context={"cells": cell_serializer.data},
        )
        return Response(game_serializer.data, status=HTTPStatus.OK)

    def create(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def update(self, request, pk):
        return super().update(request, pk, game_id=pk)

    def destroy(self, request, pk):
        return super().destroy(request, pk, game_id=pk)


class PrizeAPIView(
    ModelViewSet,
    GameNotStartedMixin,
):

    """Create prize"""

    permission_classes = [IsAdminUser]
    serializer_class = game.serializers.PrizeSerializer
    queryset = game.models.Prize.objects.all()

    def list(self, request):
        prizes = game.models.Prize.objects.all()
        prizes_serializer = game.serializers.PrizeSerializer(
            instance=prizes,
            many=True,
        )
        return Response(prizes_serializer.data, status=HTTPStatus.OK)

    def retrieve(self, request, pk=None):
        prize = game.models.Prize.objects.get(id=pk)
        prize_serializer = game.serializers.PrizeSerializer(instance=prize)

        return Response(prize_serializer.data, status=HTTPStatus.OK)

    def post(self, request):
        data = request.data.copy()

        prize = game.serializers.PrizeSerializer(data=data)
        prize.is_valid(raise_exception=True)
        prize.save()

        data["prize"] = prize.data
        data["cell"]["game"] = data["game"]
        ship = game.serializers.ShipSerializer(data=data)
        ship.is_valid(raise_exception=True)
        ship.save()

        return Response(status=HTTPStatus.CREATED)

    def update(self, request, pk):
        return super().update(request, pk, game_id=request.data["game"])

    def destroy(self, request, pk):
        return super().destroy(request, pk, game_id=request.data["game"])


class ShootAPIView(APIView):
    """Make shoot"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_game = game.models.Game.objects.get(
            id=request.data.get("game"),
        )

        cell, created = game.models.Cell.objects.get_or_create(
            x=request.data.get("x"),
            y=request.data.get("y"),
            game=current_game,
        )

        data = {"before_cell_status": cell.status}

        user_shots = game.models.UserShots.objects.get(
            user=request.user,
            game=current_game,
        )

        if user_shots.count == 0:
            data["error"] = "Нет выстрелов"

        elif cell.status == 1:
            cell.status = 2
            user_shots.count -= 1

        elif cell.status == 3:
            cell.status = 4
            user_shots.count -= 1

            ship = game.models.Ship.objects.get(cell=cell)
            ship.is_alive = False
            ship.save()

            prize = game.models.Prize.objects.get(
                game.serializers.ShipSerializer(ship).data["prize"],
            )

            prize.winner = request.user
            prize.save()

            data["prize"] = game.serializers.PrizeSerializer(
                game.models.Prize.objects.get(prize),
            ).data

        cell.save()
        user_shots.save()

        data["count"] = user_shots.count
        data["after_cell_status"] = cell.status

        return Response(data=data, status=HTTPStatus.OK)


class PlayersAPIView(
    ModelViewSet,
    GameNotStartedMixin,
):

    """
    Add user - POST

    Add shots - PUT

    Delete user from game - DELETE
    """

    permission_classes = [IsAdminUser]
    serializer_class = game.serializers.UserShots
    queryset = game.models.UserShots.objects.all()

    def create(self, request):
        user = users.models.User.objects.get(id=request.data.get("user"))
        current_game = game.models.Game.objects.get(
            id=request.data.get("game"),
        )

        current_game.users.add(user)
        current_game.save()

        game.models.UserShots.objects.create(
            game=current_game,
            user=user,
            count=request.data.get("count"),
        )

        return Response(status=HTTPStatus.OK)

    def update(self, request, pk):
        return super().update(request, pk, game_id=request.data["game"])

    def destroy(self, request, pk):
        current_game = game.models.Game.objects.get(id=request.data["game"])
        if current_game.status == 1:
            current_game.users.remove(pk)
            return self.destroy(request, pk)

        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)
