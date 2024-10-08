from django.db import models
from accounts.models import User


class Benefactor(models.Model):
    class BenefactorExperience(models.IntegerChoices):
        BEGINNER = 0, 'Beginner'
        INTERMEDIATE = 1, 'Intermediate'
        EXPERT = 2, 'Expert'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    experience = models.SmallIntegerField(
        choices=BenefactorExperience.choices,
        default=BenefactorExperience.BEGINNER
    )
    free_time_per_week = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return self.user.username
