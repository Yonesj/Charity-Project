from rest_framework import serializers
from .models import Benefactor


class BenefactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefactor
        fields = ('experience', 'free_time_per_week')

    def save(self, **kwargs):
        user = kwargs.get('user')
        return super().save(user=user)
