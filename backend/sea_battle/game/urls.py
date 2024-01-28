from django.urls import path
from rest_framework import routers

from game import views

app_name = "game"

urlpatterns = [
    path("shoot/", views.ShootAPIView.as_view(), name="shoot"),
    path("finished/", views.GameFinishedAPIView.as_view(), name="finished"),
]

router = routers.DefaultRouter()
router.register(r"prize", views.PrizeAPIView, basename="prize")
router.register(r"players", views.PlayersAPIView, basename="players")
router.register(r"", views.GameAPIView, basename="game")

urlpatterns += router.urls
