# Generated by Django 5.0.1 on 2024-01-18 21:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("game", "0005_remove_prize_image_alter_game_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cell",
            name="status",
            field=models.IntegerField(
                choices=[
                    (1, "Пустая"),
                    (2, "Уничтоженная"),
                    (3, "Стоит корабль"),
                    (4, "Стоит уничтоженный корабль"),
                ],
                default=1,
                verbose_name="статус",
            ),
        ),
    ]
