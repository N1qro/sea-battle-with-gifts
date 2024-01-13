from rest_framework import serializers


from users import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "password", "email", "username"]

    def create(self, validated_data):
        return models.User.objects.create_user(**validated_data)
