from django.db import models

from accounts.models import User
from .validators import RegNumberValidator


class Charity(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    reg_number = models.CharField(max_length=10, validators=[RegNumberValidator])

    def __str__(self):
        return self.name
