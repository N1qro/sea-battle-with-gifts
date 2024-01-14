from rest_framework import serializers


from game import models


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Game
        fields = ["id", "title", "size", "text", "link"]


class PrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Prize
        fields = ["id", "title", "text", "activation_code"]


class ShipSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ship
        fields = ["id", "cell", "prize", "game"]
