from rest_framework import serializers


from game import models
from users.models import User


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Game
        fields = ["id", "title", "size", "text", "link"]


class UserShots(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(
        queryset=models.Game.objects.all(),
    )
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
    )

    class Meta:
        model = models.UserShots
        fields = ["id", "count", "game", "user"]


class PrizeSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(
        queryset=models.Game.objects.all(),
    )

    class Meta:
        model = models.Prize
        fields = ["id", "title", "text", "game", "winner", "activation_code"]


class CellSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(
        queryset=models.Game.objects.all(),
    )

    class Meta:
        model = models.Cell
        fields = ["id", "y", "x", "status", "game"]


class ShipSerializer(serializers.ModelSerializer):
    game = serializers.PrimaryKeyRelatedField(
        queryset=models.Game.objects.all(),
    )
    prize = serializers.PrimaryKeyRelatedField(
        queryset=models.Prize.objects.all(),
    )
    cell = CellSerializer()

    class Meta:
        model = models.Ship
        fields = ["id", "cell", "game", "is_alive", "prize"]

    def create(self, validated_data):
        cell = models.Cell.objects.create(
            status=3,
            **validated_data.pop("cell"),
        )

        return models.Ship.objects.create(cell=cell, **validated_data)
