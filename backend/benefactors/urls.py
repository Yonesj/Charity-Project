from django.urls import path

from .views import *

urlpatterns = [
    path('', BenefactorRegistration.as_view()),
]
