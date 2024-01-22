from django.urls import path

from game import views


urlpatterns = [
    path("", views.GameAPIView.as_view()),
    path("<int:pk>/", views.GameAPIView.as_view()),
    path("prize/", views.PrizeAPIView.as_view()),
    path("prize/<int:pk>", views.PrizeAPIView.as_view()),
    path("shoot/", views.ShootAPIView.as_view()),
    path("players/", views.PlayersAPIView.as_view()),
    path("players/<int:pk>", views.PlayersAPIView.as_view()),
]
