from django.contrib import admin

from game import models


admin.site.register(models.Game, readonly_fields=["link"])
admin.site.register(models.Prize, readonly_fields=["activation_code"])