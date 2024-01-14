from django.db.models import Sum
from rest_framework import serializers


from game.models import Game, Prize, UserShots
from users import models


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "password", "email", "username"]

    def create(self, validated_data):
        return models.User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "username", "email"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        games = Game.objects.filter(users=instance).count()
        shots = UserShots.objects.filter(user=instance).aggregate(
            shot_count=Sum("count"),
        )["shot_count"]

        representation["game_count"] = games
        representation["shot_count"] = shots

        return representation


class InvitesSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return {
            "id": instance.pk,
            "title": instance.game.title,
            "text": instance.game.text,
            "link": instance.game.link,
            "shots": instance.count,
        }


class UserGamesSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        prizes_count = Prize.objects.filter(
            winner=instance.user,
            game=instance.game,
        ).count()

        return {
            "id": instance.pk,
            "title": instance.game.title,
            "text": instance.game.text,
            "link": instance.game.link,
            "shots": instance.count,
            "prizes_count": prizes_count,
        }
