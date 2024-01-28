import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


import game.models
from users import models


class UserTests(APITestCase):
    def setUp(self):
        self.user = models.User.objects.create_superuser(
            username="test",
            email="test@mail.com",
            password="qwerty12345678",
        )

        self.client.login(username="test", password="qwerty12345678")

        self.game = game.models.Game.objects.create(
            title="test",
            text="text",
            size=10,
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

    def test_get_game(self):
        data = {
            "id": 1,
            "title": "test",
            "link": self.game.link,
            "status": 1,
            "size": 10,
        }

        response = self.client.get(
            reverse("game:game-detail", kwargs={"link": self.game.link}),
            data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_game(self):
        game_count = models.User.objects.count()

        data = {
            "title": "test2",
            "text": "text2",
            "size": 10,
        }

        response = self.client.post(reverse("game:game-list"), data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(game.models.Game.objects.count(), game_count + 1)

    def test_update_game(self):
        data = {
            "title": "test",
            "text": "text",
            "size": 15,
        }

        response = self.client.put(
            reverse("game:game-detail", kwargs={"link": self.game.link}),
            data,
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            game.models.Game.objects.get(link=self.game.link).size,
            15,
        )

    def test_update_started_game(self):
        self.game.status = 2
        self.game.save()

        data = {
            "title": "test",
            "text": "text",
            "size": 15,
        }

        expected_data = {
            "details": "Вы не можете изменять уже начавшуюся игру",
        }

        response = self.client.put(
            reverse("game:game-detail", kwargs={"link": self.game.link}),
            data,
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )
        self.assertEqual(
            game.models.Game.objects.get(link=self.game.link).size,
            10,
        )
        self.assertEqual(json.loads(response.content), expected_data)

    def test_delete_game(self):
        game_count = game.models.Game.objects.count()

        response = self.client.delete(
            reverse("game:game-detail", kwargs={"link": self.game.link}),
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(game.models.Game.objects.count(), game_count - 1)

    def test_get_prize_api(self):
        data = {
            "id": 1,
            "title": "test",
            "text": "text",
            "image": None,
            "game": self.game.link,
            "winner": None,
            "activation_code": "test code",
        }

        response = self.client.get(
            reverse("game:prize-detail", kwargs={"pk": 1}),
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), data)

    def test_create_prize_api(self):
        prize_count = game.models.Prize.objects.count()
        data = {
            "title": "test2",
            "text": "text2",
            "game": self.game.link,
            "activation_code": "test code",
            "cell": {"position": "A1"},
        }

        response = self.client.post(
            reverse("game:prize-list"),
            data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(game.models.Prize.objects.count(), prize_count + 1)

    def test_update_prize(self):
        data = {
            "title": "update test",
            "text": "text",
            "game": self.game.link,
            "activation_code": "test code",
        }

        response = self.client.put(
            reverse("game:prize-detail", kwargs={"pk": self.prize.pk}),
            data,
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            game.models.Prize.objects.get(pk=self.prize.pk).title,
            "update test",
        )

    def test_delete_prize(self):
        prize_count = game.models.Prize.objects.count()

        data = {"game": self.game.link}

        response = self.client.delete(
            reverse("game:prize-detail", kwargs={"pk": self.prize.pk}),
            data,
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(game.models.Prize.objects.count(), prize_count - 1)

    def test_make_shoot(self):
        self.user.is_superuser = False
        self.user.save()

        data = {
            "position": "A1",
            "user": self.user.pk,
            "game": self.game.link,
        }

        expected_data = {
            "before_cell_status": 0,
            "count": 1,
            "after_cell_status": 1,
        }

        response = self.client.post(reverse("game:shoot"), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), expected_data)

    def test_make_shoot_superuser(self):
        data = {
            "position": "A1",
            "user": self.user.pk,
            "game": self.game.link,
        }

        expected_data = {
            "details": "Вы не можете стрелять, "
            "так как являетесь администратором",
        }

        response = self.client.post(reverse("game:shoot"), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content), expected_data)

    def test_make_shoot_without_shots(self):
        self.user.is_superuser = False
        self.user.save()

        self.user_shots.count = 0
        self.user_shots.save()

        data = {
            "position": "A1",
            "user": self.user.pk,
            "game": self.game.link,
        }

        expected_data = {
            "before_cell_status": 0,
            "count": 0,
            "after_cell_status": 0,
            "error": "Нет выстрелов",
        }

        response = self.client.post(reverse("game:shoot"), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), expected_data)

    def test_add_player(self):
        test_user = models.User.objects.create_user(
            username="test user",
            email="test_user@mail.com",
            password="qwerty12345678",
        )

        data = {"count": 5, "user": test_user.pk, "game": self.game.link}

        response = self.client.post(
            reverse("game:players-list"),
            data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            game.models.UserShots.objects.get(user=test_user).count,
            5,
        )

    def test_delete_player(self):
        player_count = self.game.users.count()

        data = {"game": self.game.link}

        response = self.client.delete(
            reverse("game:players-detail", kwargs={"pk": self.user.pk}),
            data,
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            game.models.Game.objects.get(pk=self.game.pk).users.count(),
            player_count - 1,
        )
