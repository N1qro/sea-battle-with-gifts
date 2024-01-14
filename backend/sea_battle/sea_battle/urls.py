from django.conf import settings
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/", include("users.urls")),
    path("api-auth/", include("rest_framework.urls")),
]


if settings.DEBUG:
    import debug_toolbar

    urlpatterns += (
        path(
            "__debug__/",
            include(debug_toolbar.urls),
        ),
    )
