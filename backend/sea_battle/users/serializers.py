from django.db.models import Sum
from rest_framework import serializers


from game.models import Prize, UserShots
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
        fields = ["id", "username", "email", "is_superuser"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        prizes = Prize.objects.filter(winner=instance).count()
        shots = UserShots.objects.filter(user=instance).aggregate(
            count=Sum("count"),
        )["count"]

        representation["prize_count"] = prizes
        representation["count"] = shots if shots else 0

        return representation


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "username"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        shots = UserShots.objects.get(user=instance, game=self.context["game"])

        representation["count"] = shots.count

        return representation


class InvitesSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return {
            "id": instance.game.pk,
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
            "id": instance.game.pk,
            "title": instance.game.title,
            "link": instance.game.link,
            "finish_at": instance.game.finish_at,
            "shots": instance.count,
            "prizes_count": prizes_count,
        }
