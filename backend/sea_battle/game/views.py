from http import HTTPStatus

from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.views import APIView

import game.models
import game.serializers
import users.models
import users.serializers


class GameNotStartedMixin:

    def put(self, request, pk):
        if game.models.Game.objects.get(id=request.data["game"]).status == 1:
            return self.update(request, pk)
        
        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)

    def delete(self, request, pk):
        if game.models.Game.objects.get(id=request.data["game"]).status == 1:
            return self.destroy(request, pk)
        
        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)


class GameAPIView(
        GenericAPIView,
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        GameNotStartedMixin,
    ):
    
    """
    POST - create game

    PUT - update game

    DELETE - delete game
    """

    permission_classes = [IsAdminUser]
    serializer_class = game.serializers.GameSerializer
    queryset = game.models.Game.objects.all()
    
    def put(self, request, pk):
        request.data["game"] = pk
        return super().put(request, pk)
    
    def delete(self, request, pk):
        request.data["game"] = pk
        return super().delete(request, pk)
    

class PrizeAPIView(
        GenericAPIView,
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
        GameNotStartedMixin,
    ):

    """Create prize"""

    # permission_classes = [IsAdminUser]
    serializer_class = game.serializers.PrizeSerializer
    queryset = game.models.Prize.objects.all()

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
    
    def put(self, request, pk):
        return super().put(request, pk)

    def delete(self, request, pk):
        return super().delete(request, pk)



class ShootAPIView(APIView):
    """Make shoot"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_game = game.models.Game.objects.get(id=request.data.get("game"))

        cell, created = game.models.Cell.objects.get_or_create(
            x=request.data.get("x"),
            y=request.data.get("y"),
            game=current_game,
        )

        data = {"before_cell_status": cell.status}

        user_shots = game.models.UserShots.objects.get(user=request.user, game=current_game)

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
        GenericAPIView,
        mixins.CreateModelMixin,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin,
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
    
    def put(self, request, pk):
        return self.update(request, pk)

    def delete(self, request, pk):
        current_game = game.models.Game.objects.get(id=request.data["game"])
        if current_game.status == 1:
            current_game.users.remove(pk)
            return self.destroy(request, pk)
        
        return Response(status=HTTPStatus.METHOD_NOT_ALLOWED)
