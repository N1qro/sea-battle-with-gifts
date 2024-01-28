from rest_framework import serializers


from game import models
from users.models import User


class GameSerializer(serializers.ModelSerializer):
    link = serializers.ReadOnlyField()

    class Meta:
        model = models.Game
        fields = ["id", "title", "status", "size", "text", "link"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if self.context.get("cells"):
            representation["cells"] = self.context["cells"]

        if self.context.get("players"):
            representation["players"] = self.context["players"]

        if self.context.get("count"):
            representation["count"] = self.context["count"]

        if self.context.get("players_count"):
            representation["players_count"] = instance.users.count()

        if self.context.get("prizes_count"):
            representation["prizes_count"] = models.Prize.objects.filter(
                game=instance,
            ).count()

        return representation


class UserShots(serializers.ModelSerializer):
    game = serializers.SlugRelatedField(
        slug_field="link",
        queryset=models.Game.objects.all(),
    )

    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
    )

    class Meta:
        model = models.UserShots
        fields = ["id", "count", "game", "user"]


class PrizeSerializer(serializers.ModelSerializer):
    game = serializers.SlugRelatedField(
        slug_field="link",
        queryset=models.Game.objects.all(),
    )

    class Meta:
        model = models.Prize
        fields = [
            "id",
            "title",
            "text",
            "image",
            "game",
            "winner",
            "activation_code",
        ]


class CellSerializer(serializers.ModelSerializer):
    game = serializers.SlugRelatedField(
        slug_field="link",
        queryset=models.Game.objects.all(),
    )

    class Meta:
        model = models.Cell
        fields = ["id", "position", "status", "game"]


class CellWithShipSerializer(serializers.ModelSerializer):
    ship = serializers.SerializerMethodField()

    class Meta:
        model = models.Cell
        fields = ["id", "position", "status", "ship"]

    def get_ship(self, obj):
        try:
            ship = models.Ship.objects.get(cell=obj)
            return ShipWithPrizeSerializer(instance=ship).data

        except models.Ship.DoesNotExist:
            return {}


class ShipSerializer(serializers.ModelSerializer):
    game = serializers.SlugRelatedField(
        slug_field="link",
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
            status=2,
            **validated_data.pop("cell"),
        )

        return models.Ship.objects.create(cell=cell, **validated_data)


class ShipWithPrizeSerializer(serializers.ModelSerializer):
    prize = PrizeSerializer()

    class Meta:
        model = models.Ship
        fields = ["id", "is_alive", "prize"]
