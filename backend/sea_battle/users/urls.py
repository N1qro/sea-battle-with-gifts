from django.urls import path
from rest_framework_simplejwt import views as jwt_views


from users import views

app_name = "users"

urlpatterns = [
    path(
        "auth/",
        views.TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "auth/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("data/", views.UserDataAPIView.as_view(), name="data"),
    path("prizes/", views.UserPrizesAPIView.as_view(), name="prizes"),
    path("register/", views.RegisterAPIView.as_view(), name="register"),
    path("invites/", views.UserInvitesAPIView.as_view(), name="invites"),
    path("games/", views.UserGamesAPIView.as_view(), name="games"),
]
