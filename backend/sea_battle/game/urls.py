from django.urls import path
from rest_framework import routers

from game import views


router = routers.DefaultRouter()
router.register(r"prize", views.PrizeAPIView)
router.register(r"players", views.PlayersAPIView, basename="Players")
router.register(r"", views.GameAPIView)


urlpatterns = [
    path("shoot/", views.ShootAPIView.as_view()),
]

urlpatterns += router.urls
