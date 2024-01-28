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
    def update(self, request, pk, game_link=None):
        if game.models.Game.objects.get(link=game_link).status in (0, 1):
            return self.update(request, pk)

        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)

    def destroy(self, request, pk, game_link=None):
        if game.models.Game.objects.get(link=game_link).status in (0, 1):
            return self.destroy(request, pk)

        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)


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
    lookup_field = "link"

    def list(self, request):
        games = game.models.Game.objects.all()
        game_serializer = game.serializers.GameSerializer(
            instance=games,
            many=True,
        )
        return Response(game_serializer.data, status=HTTPStatus.OK)

    @decorators.permission_classes([IsAuthenticated])
    def retrieve(self, request, link):
        current_game = game.models.Game.objects.get(link=link)
        cells = game.models.Cell.objects.filter(game=current_game)

        context = {}

        if request.user.is_superuser:
            cell_serializer = game.serializers.CellWithShipSerializer(
                instance=cells,
                many=True,
            )

            players_serializers = users.serializers.PlayerSerializer(
                instance=current_game.users,
                many=True,
                context={"game": current_game},
            )

            context["players"] = players_serializers.data

        else:
            cell_serializer = game.serializers.CellSerializer(
                instance=cells.filter(status__in=[0, 1, 3]),
                many=True,
            )

        context["cells"] = cell_serializer.data
        game_serializer = game.serializers.GameSerializer(
            instance=current_game,
            context=context,
        )
        return Response(game_serializer.data, status=HTTPStatus.OK)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, link):
        pk = game.models.Game.objects.get(link=link).pk
        return super().update(request, pk, game_link=link)

    def destroy(self, request, link):
        pk = game.models.Game.objects.get(link=link).pk
        return super().destroy(request, pk, game_link=link)


class PrizeAPIView(
    ModelViewSet,
    GameNotStartedMixin,
):

    """Create prize"""

    permission_classes = [IsAdminUser]
    serializer_class = game.serializers.PrizeSerializer
    queryset = game.models.Prize.objects.all()

    def list(self, request):
        return super().list(request)

    def retrieve(self, request, pk):
        return super().retrieve(request, pk)

    def create(self, request):
        data = request.data.copy()

        prize = game.serializers.PrizeSerializer(data=data)
        prize.is_valid(raise_exception=True)
        prize.save()

        new_data = {
            "text": data.get("text"),
            "title": data.get("title"),
            "activation_code": data.get("activation_code"),
            "game": data.get("game"),
            "prize": prize.instance.pk,
            "cell": {
                "game": data.get("game"),
                "position": data.get("cell[position]"),
            }
        }

        ship = game.serializers.ShipSerializer(data=new_data)
        ship.is_valid(raise_exception=True)
        ship.save()

        return Response(status=HTTPStatus.CREATED)

    def update(self, request, pk):
        return super().update(request, pk, game_link=request.data["game"])

    def destroy(self, request, pk):
        return super().destroy(request, pk, game_link=request.data["game"])


class ShootAPIView(APIView):
    """Make shoot"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.is_superuser:
            return Response(
                data={
                    "detail": "Вы не можете стрелять,"
                    "так как являетесь администратором",
                },
                status=HTTPStatus.BAD_REQUEST,
            )

        current_game = game.models.Game.objects.get(
            link=request.data.get("game"),
        )

        cell, created = game.models.Cell.objects.get_or_create(
            position=request.data.get("position"),
            game=current_game,
        )

        data = {"before_cell_status": cell.status}

        user_shots = game.models.UserShots.objects.get(
            user=request.user,
            game=current_game,
        )

        if user_shots.count == 0:
            data["error"] = "Нет выстрелов"

        elif cell.status == 0:
            cell.status = 1
            user_shots.count -= 1

        elif cell.status == 2:
            cell.status = 3
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

    def list(self, request):
        return super().list(request)

    def create(self, request):
        user = users.models.User.objects.get(id=request.data.get("user"))

        if user.is_superuser:
            return Response(
                data={
                    "detail": "Вы не можете добавлять в игру администраторов",
                },
                status=HTTPStatus.BAD_REQUEST,
            )

        current_game = game.models.Game.objects.get(
            link=request.data.get("game"),
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
        current_game = game.models.Game.objects.get(link=request.data["game"])
        user = users.models.User.objects.get(pk=pk)
        user_shots = game.models.UserShots.objects.get(
            user=user,
            game=current_game,
        )

        if current_game.status in (0, 1):
            serializer = game.serializers.UserShots(
                instance=user_shots,
                data=request.data,
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(data=serializer.data, status=HTTPStatus.OK)

        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)

    def destroy(self, request, pk):
        current_game = game.models.Game.objects.get(link=request.data["game"])
        user = users.models.User.objects.get(pk=pk)
        user_shots = game.models.UserShots.objects.get(
            user=user,
            game=current_game,
        )

        if current_game.status in (0, 1):
            current_game.users.remove(user)
            user_shots.delete()

            return Response(status=HTTPStatus.OK)

        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)
