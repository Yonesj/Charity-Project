from django.urls import path

from .views import UserRegistration, LoginAPIView


urlpatterns = [
    path('register/', UserRegistration.as_view(), name="user-registration-link"),
    path('login/', LoginAPIView.as_view(), name="user-login-link")
]
