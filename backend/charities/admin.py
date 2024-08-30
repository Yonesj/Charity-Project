from django.contrib import admin
from .models import Charity


@admin.register(Charity)
class CharityAdmin(admin.ModelAdmin):
    pass
