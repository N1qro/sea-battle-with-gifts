from django.urls import path
from rest_framework_simplejwt import views as jwt_views


from users import views

urlpatterns = [
    path(
        "auth/",
        jwt_views.TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "auth/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("data/", views.UserDataAPIView.as_view()),
    path("prizes/", views.UserPrizesAPIView.as_view()),
    path("register/", views.RegisterAPIView.as_view()),
    path("invites/", views.UserInvitesAPIView.as_view()),
    path("games/", views.UserGamesAPIView.as_view()),
]
