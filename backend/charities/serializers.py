from rest_framework import serializers
from .models import Benefactor, Charity


class BenefactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefactor
        fields = ('experience', 'free_time_per_week')

    def save(self, **kwargs):
        user = kwargs.get('user')
        return super().save(user=user)


class CharitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Charity
        fields = ('name', 'reg_number')

    def save(self, **kwargs):
        user = kwargs.get('user')
        return super().save(user=user)
