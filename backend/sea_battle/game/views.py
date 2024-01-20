from http import HTTPStatus

from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import game.models
import game.serializers
import users.models
import users.serializers


class CreateGameAPIView(CreateAPIView):
    """Create game"""

    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = game.serializers.GameSerializer

    def post(self, request):
        serializer = game.serializers.GameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=HTTPStatus.CREATED)


class CreatePrizeAPIView(CreateAPIView):
    """Create prize"""

    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        prize = game.serializers.PrizeSerializer(data=request.data)
        prize.is_valid(raise_exception=True)
        prize.save()

        request.data["prize"] = prize.instance.id
        request.data["cell"]["game"] = request.data["game"]
        ship = game.serializers.ShipSerializer(data=request.data)
        ship.is_valid(raise_exception=True)
        ship.save()

        return Response(status=HTTPStatus.CREATED)


class ShootAPIView(APIView):
    """Make shoot"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        cell, created = game.models.Cell.objects.get_or_create(
            x=request.data.get("x"),
            y=request.data.get("y"),
            game=game.models.Game.objects.get(id=request.data.get("game")),
        )

        data = {"before_cell_status": cell.status}

        if cell.status == 1:
            cell.status = 2

        elif cell.status == 3:
            cell.status = 4

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

        data["after_cell_status"] = cell.status

        return Response(data=data, status=HTTPStatus.OK)


class PlayersAPIView(CreateAPIView, UpdateAPIView):
    """
    Add user - POST

    Add shots - PUT
    """

    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = game.serializers.UserShots

    def post(self, request):
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

    def put(self, request):
        user = users.models.User.objects.get(id=request.data.get("user"))
        current_game = game.models.Game.objects.get(
            id=request.data.get("game"),
        )

        game.models.UserShots.objects.get(user=user, game=current_game).update(
            count=request.data["count"],
        )

        return Response(status=HTTPStatus.OK)
