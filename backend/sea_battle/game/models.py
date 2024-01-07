from django.contrib.auth.models import User
from django.db import models


class Game(models.Model):
    title = models.CharField(
        verbose_name="название",
        max_length=150,
    )

    size = models.PositiveSmallIntegerField(
        verbose_name="размер",
    )

    text = models.TextField(
        verbose_name="описание",
    )

    status = models.IntegerField(
        choices=(
            (1, "Не начата"),
            (2, "Начата"),
            (3, "Окончена"),
        ),
        verbose_name="статус",
    )

    users = models.ManyToManyField(
        User,
        related_name="game",
    )


class Cell(models.Model):
    y = models.PositiveSmallIntegerField()

    x = models.PositiveSmallIntegerField()

    status = models.IntegerField(
        choices=(
            (1, "Пустая"),
            (2, "Уничтоженная"),
            (3, "Стоит корабль"),
            (4, "Стоит уничтоженный корабль"),
        ),
        verbose_name="статус",
    )

    shot_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="уничтожена игроком",
        related_name="cell",
        blank=True,
        null=True,
    )

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        verbose_name="игра",
        related_name="cell",
    )


class Prize(models.Model):
    title = models.CharField(
        verbose_name="название",
        max_length=150,
    )

    text = models.TextField(
        verbose_name="описание",
    )

    image = models.ImageField(
        upload_to="prize_images/",
        verbose_name="картинка приза",
    )

    winner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="победитель",
        related_name="prize",
        blank=True,
        null=True,
    )


class Ship(models.Model):
    is_alive = models.BooleanField(
        verbose_name="жив",
        default=True,
    )

    cell = models.ForeignKey(
        Cell,
        on_delete=models.CASCADE,
        verbose_name="клетка",
        related_name="ship",
    )

    prize = models.ForeignKey(
        Prize,
        on_delete=models.CASCADE,
        verbose_name="приз",
        related_name="ship",
    )

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        verbose_name="игра",
        related_name="ship",
    )
