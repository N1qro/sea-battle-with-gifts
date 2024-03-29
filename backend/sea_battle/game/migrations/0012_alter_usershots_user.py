# Generated by Django 5.0.1 on 2024-01-27 10:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("game", "0011_alter_usershots_unique_together"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="usershots",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="user_shots",
                to=settings.AUTH_USER_MODEL,
                verbose_name="пользователь",
            ),
        ),
    ]
