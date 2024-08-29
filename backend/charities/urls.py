from django.urls import path

from .views import *

urlpatterns = [
    path('benefactors/', BenefactorRegistration.as_view()),
    path('charities/', CharityRegistration.as_view()),
    path('tasks/', Tasks.as_view()),
    path('tasks/<int:task_id>/request/', TaskRequest.as_view()),
    path('tasks/<int:task_id>/response/', TaskResponse.as_view()),
    path('tasks/<int:task_id>/done/', DoneTask.as_view()),
]
