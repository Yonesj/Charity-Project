from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from .models import Task
from .permissions import IsBenefactor, IsCharityOwner
from .serializers import TaskSerializer


class Tasks(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.all_related_tasks_to_user(self.request.user)

    def post(self, request, *args, **kwargs):
        data = {
            **request.data,
            "charity_id": request.user.charity.id
        }
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            self.permission_classes = [IsAuthenticated, ]
        else:
            self.permission_classes = [IsCharityOwner, ]

        return [permission() for permission in self.permission_classes]

    def filter_queryset(self, queryset):
        filter_lookups = {}
        for name, value in Task.filtering_lookups:
            param = self.request.GET.get(value)
            if param:
                filter_lookups[name] = param
        exclude_lookups = {}
        for name, value in Task.excluding_lookups:
            param = self.request.GET.get(value)
            if param:
                exclude_lookups[name] = param

        return queryset.filter(**filter_lookups).exclude(**exclude_lookups)


class TaskRequest(APIView):
    permission_classes = (IsBenefactor, )

    def get(self, request, task_id):
        task = get_object_or_404(Task, id=task_id)

        if task.state != Task.TaskStatus.PENDING:
            return Response(data={
                'detail': 'This task is not pending.'
            }, status=status.HTTP_404_NOT_FOUND)

        task.submit_benefactor_request(request.user.benefactor)
        return Response(data={'detail': 'Request sent.'}, status=status.HTTP_200_OK)


class TaskResponse(APIView):
    permission_classes = (IsCharityOwner,)

    def post(self, request, task_id):
        data = request.data

        if data['response'] not in ['A', 'R']:
            return Response(data={
                'detail': 'Required field ("A" for accepted / "R" for rejected)'
            }, status=status.HTTP_400_BAD_REQUEST)

        task = get_object_or_404(Task, id=task_id)

        if task.state != Task.TaskStatus.WAITING:
            return Response(data={'detail': 'This task is not waiting.'}, status=status.HTTP_404_NOT_FOUND)

        task.response_to_benefactor_request(data['response'])
        return Response(data={'detail': 'Response sent.'}, status=status.HTTP_200_OK)


class DoneTask(APIView):
    permission_classes = (IsCharityOwner,)

    def post(self, request, task_id):
        task = get_object_or_404(Task, id=task_id)

        if task.state != Task.TaskStatus.ASSIGNED:
            return Response(data={'detail': 'Task is not assigned yet.'}, status=status.HTTP_404_NOT_FOUND)

        task.done()
        return Response(data={'detail': 'Task has been done successfully.'}, status=status.HTTP_200_OK)
