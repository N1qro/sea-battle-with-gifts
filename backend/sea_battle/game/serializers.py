from rest_framework import serializers


from game import models


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Game
        fields = ["id", "title", "size", "text"]


class PrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Game
        fields = ["id", "title", "text", "image"]


class ShipSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Game
        fields = ["id", "cell", "prize", "game"]
