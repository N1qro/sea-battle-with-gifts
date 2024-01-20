from django.contrib import admin

from game import models


admin.site.register(models.Game, readonly_fields=["link"])
admin.site.register(models.Prize)
admin.site.register(models.UserShots)
admin.site.register(models.Ship)
admin.site.register(models.Cell)
