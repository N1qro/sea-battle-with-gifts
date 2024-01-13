from django.urls import path
from rest_framework_simplejwt import views as jwt_views


from users import views

urlpatterns = [
    path(
        "token/",
        jwt_views.TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("user/", views.get_user),
    path("signup/", views.SignupAPIView.as_view()),
]
