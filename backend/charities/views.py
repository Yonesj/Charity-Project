from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Benefactor, Charity, Task
from accounts.permissions import IsBenefactor
from .serializers import BenefactorSerializer, CharitySerializer


class BenefactorRegistration(generics.CreateAPIView):
    queryset = Benefactor.objects.all()
    serializer_class = BenefactorSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer: BenefactorSerializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CharityRegistration(generics.CreateAPIView):
    queryset = Charity.objects.all()
    serializer_class = CharitySerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer: CharitySerializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Tasks(APIView):
    pass


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
    pass


class DoneTask(APIView):
    pass
