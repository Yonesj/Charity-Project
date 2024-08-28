from rest_framework import serializers
from .models import Benefactor, Charity


class BenefactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefactor
        fields = ('experience', 'free_time_per_week')

    def save(self, **kwargs):
        user = kwargs.get('user')
        assert user is not None, "`user` is None"
        return super().save(user=user)