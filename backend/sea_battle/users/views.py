from http import HTTPStatus

from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView as SimpleTokenObtainPairView,
)

import game.models
import game.serializers
import users.models
import users.serializers


class TokenObtainPairView(SimpleTokenObtainPairView):
    serializer_class = users.serializers.TokenObtainPairSerializer


class UserDataAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = users.serializers.UserSerializer(instance=request.user)

        return Response(serializer.data, status=HTTPStatus.OK)


class UserPrizesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        prizes = game.models.Prize.objects.filter(winner=request.user)
        serializer = game.serializers.PrizeSerializer(
            instance=prizes,
            many=True,
        )

        return Response(serializer.data, status=HTTPStatus.OK)


class UserInvitesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        games = game.models.Game.objects.filter(users=request.user, status=2)
        shots = game.models.UserShots.objects.select_related("game").filter(
            user=request.user,
            game__in=games,
        )

        serializer = users.serializers.InvitesSerializer(
            instance=shots,
            many=True,
        )

        return Response(serializer.data, status=HTTPStatus.OK)


class UserGamesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        games = game.models.Game.objects.filter(users=request.user, status=3)
        shots = game.models.UserShots.objects.select_related("game").filter(
            user=request.user,
            game__in=games,
        )

        serializer = users.serializers.UserGamesSerializer(
            instance=shots,
            many=True,
        )

        return Response(serializer.data, status=HTTPStatus.OK)


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = users.serializers.RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=HTTPStatus.CREATED)
