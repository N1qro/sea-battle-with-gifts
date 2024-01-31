from django.contrib import admin

from game import models


admin.site.register(models.UserShots)
admin.site.register(models.Ship)
admin.site.register(models.Cell)


@admin.register(models.Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ["title", "link", "status"]
    readonly_fields = ["link", "finish_at"]

    filter_horizontal = ["users"]

    list_filter = ["status"]


@admin.register(models.Prize)
class PrizeAdmin(admin.ModelAdmin):
    list_filter = ("winner", "game")
