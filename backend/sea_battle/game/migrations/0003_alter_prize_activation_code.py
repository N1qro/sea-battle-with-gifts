# Generated by Django 5.0.1 on 2024-01-14 18:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("game", "0002_usershots_count"),
    ]

    operations = [
        migrations.AlterField(
            model_name="prize",
            name="activation_code",
            field=models.CharField(
                blank=True, max_length=150, null=True, verbose_name="код активации"
            ),
        ),
    ]
