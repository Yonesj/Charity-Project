from django.urls import path

from .views import *

urlpatterns = [
    path('', CharityRegistration.as_view()),
]
