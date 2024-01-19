from django.urls import path


from game import views

urlpatterns = [
    path("create/", views.CreateGameAPIView.as_view()),
    path("prize/create/", views.CreatePrizeAPIView.as_view()),
    path("shoot/", views.ShootAPIView.as_view()),
    path("players/", views.AddPlayerAPIView.as_view()),
]
