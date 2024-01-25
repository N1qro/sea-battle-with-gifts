from django.urls import path
from rest_framework import routers

from game import views


router = routers.SimpleRouter()
router.register(r"prize", views.PrizeAPIView)
router.register(r"players", views.PlayersAPIView)
router.register(r"", views.GameAPIView)


urlpatterns = [
    path("shoot/", views.ShootAPIView.as_view()),
]

urlpatterns += router.urls
