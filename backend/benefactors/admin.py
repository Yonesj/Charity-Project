from django.contrib import admin
from .models import Benefactor


@admin.register(Benefactor)
class BenefactorAdmin(admin.ModelAdmin):
    pass
