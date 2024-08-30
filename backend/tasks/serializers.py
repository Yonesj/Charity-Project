from rest_framework import serializers

from .models import Task
from benefactors.serializers import BenefactorSerializer
from charities.serializers import CharitySerializer
from charities.models import Charity


class TaskSerializer(serializers.ModelSerializer):
    state = serializers.ChoiceField(read_only=True, choices=Task.TaskStatus.choices)
    assigned_benefactor = BenefactorSerializer(required=False)
    charity = CharitySerializer(read_only=True)
    charity_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Charity.objects.all(), source='charity')

    class Meta:
        model = Task
        fields = (
            'id',
            'title',
            'state',
            'charity',
            'charity_id',
            'description',
            'assigned_benefactor',
            'date',
            'age_limit_from',
            'age_limit_to',
            'gender_limit',
        )