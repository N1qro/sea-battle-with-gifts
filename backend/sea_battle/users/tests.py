import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


import game.models
from users import models


class UserTests(APITestCase):
    def setUp(self):
        self.user = models.User.objects.create_user(
            username="test",
            email="test@mail.com",
            password="qwerty12345678",
        )

        self.client.force_authenticate(user=self.user)

        self.game = game.models.Game.objects.create(
            title="test",
            text="text",
            size=10,
            status=1,
        )
        self.game.users.add(self.user)
        self.game.save()

        self.user_shots = game.models.UserShots.objects.create(
            game=self.game,
            user=self.user,
            count=2,
        )

        self.prize = game.models.Prize.objects.create(
            title="test",
            text="text",
            game=self.game,
            activation_code="test code",
        )

        self.cell = game.models.Cell.objects.create(
            position="A0",
            game=self.game,
        )

        self.ship = game.models.Ship.objects.create(
            cell=self.cell,
            prize=self.prize,
            game=self.game,
        )

    def test_create_user(self):
        user_count = models.User.objects.count()

        data = {
            "username": "test2",
            "email": "test2@mail.com",
            "password": "qwerty12345678",
        }

        response = self.client.post(reverse("users:register"), data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.User.objects.count(), user_count + 1)

    def test_login_user(self):
        self.client.force_authenticate(user=None)

        data = {
            "username": "test",
            "password": "qwerty12345678",
        }
        response = self.client.post(reverse("users:token_obtain_pair"), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_data_api(self):
        data = {
            "id": 1,
            "username": "test",
            "email": "test@mail.com",
            "is_superuser": False,
            "prize_count": 0,
            "count": 2,
        }

        response = self.client.get(reverse("users:data"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, data)

    def test_user_prizes_api(self):
        self.prize.winner = self.user
        self.prize.save()
        data = [
            {
                "id": 1,
                "title": "test",
                "text": "text",
                "image": None,
                "game": "VolejRejNm",
                "winner": 1,
                "activation_code": "test code",
            },
        ]

        response = self.client.get(reverse("users:prizes"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), data)

    def test_user_invites_api(self):
        self.game.status = 2
        self.game.save()
        data = [
            {
                "id": 1,
                "title": "test",
                "text": "text",
                "link": "VolejRejNm",
                "shots": 2,
            },
        ]

        response = self.client.get(reverse("users:invites"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), data)

    def test_user_games_api(self):
        self.game.status = 3
        self.game.save()
        data = [
            {
                "id": 1,
                "title": "test",
                "link": "VolejRejNm",
                "finish_at": None,
                "shots": 2,
                "prizes_count": 0,
            },
        ]

        response = self.client.get(reverse("users:games"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), data)
