from django.urls import path

from .views import *

urlpatterns = [
    path('', Tasks.as_view()),
    path('<int:task_id>/request/', TaskRequest.as_view()),
    path('<int:task_id>/response/', TaskResponse.as_view()),
    path('<int:task_id>/done/', DoneTask.as_view()),
]
