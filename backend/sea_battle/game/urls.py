from django.urls import path


from game import views

urlpatterns = [
    path("", views.CreateGameAPIView.as_view()),
    path("prize/", views.CreatePrizeAPIView.as_view()),
    path("shoot/", views.ShootAPIView.as_view()),
    path("players/", views.PlayersAPIView.as_view()),
]
