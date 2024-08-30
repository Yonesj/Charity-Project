from rest_framework import serializers
from .models import Charity


class CharitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Charity
        fields = ('name', 'reg_number')

    def save(self, **kwargs):
        user = kwargs.get('user')
        return super().save(user=user)
