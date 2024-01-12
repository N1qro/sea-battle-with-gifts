from django.contrib.auth.models import User
from django.db import models

import game.models


class UserShots(models.Model):
    game = models.ForeignKey(
        game.models.Game,
        on_delete=models.CASCADE,
        verbose_name="игра",
        related_name="user_shots",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="пользователь",
        related_name="user_shots",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name_plural = "Выстрелы пользователей"
