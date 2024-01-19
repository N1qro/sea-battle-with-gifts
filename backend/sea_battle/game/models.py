from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import hashids

from users.models import User


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
        default=1,
    )

    users = models.ManyToManyField(
        User,
        related_name="game",
    )

    link = models.CharField(
        verbose_name="ссылка",
        max_length=10,
        null=True,
        blank=True,
    )

    finish_at = models.DateTimeField(
        verbose_name="игра завершена",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Игра"
        verbose_name_plural = "Игры"

    def __str__(self):
        return self.title


@receiver(post_save, sender=Game)
def update_link(sender, instance, **kwargs):
    if not instance.link:
        instance.link = hashids.Hashids(min_length=10).encode(instance.pk)
        instance.save()


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
        default=1,
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

    class Meta:
        verbose_name = "Клетка"
        verbose_name_plural = "Клетки"

    def __str__(self):
        return self.game.title


class Prize(models.Model):
    title = models.CharField(
        verbose_name="название",
        max_length=150,
    )

    text = models.TextField(
        verbose_name="описание",
    )

    winner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="победитель",
        related_name="prize",
        blank=True,
        null=True,
    )

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        verbose_name="игра",
        related_name="prize",
    )

    activation_code = models.CharField(
        verbose_name="код активации",
        max_length=150,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Приз"
        verbose_name_plural = "Призы"

    def __str__(self):
        return self.title


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

    class Meta:
        verbose_name = "Корбаль"
        verbose_name_plural = "Корабли"

    def __str__(self):
        return self.game.title


class UserShots(models.Model):
    game = models.ForeignKey(
        Game,
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

    count = models.IntegerField(
        verbose_name="количество выстрелов",
        default=2,
    )

    class Meta:
        verbose_name_plural = "Выстрелы пользователей"

    def __str__(self):
        return self.game.title
