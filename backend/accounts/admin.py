from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    # users list panel
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']
    list_display_links = ['username']
    list_editable = ['is_staff', 'is_active']
    list_filter = ['gender', 'is_staff', 'is_superuser', 'is_active']

    # user fields
    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'gender', 'age', 'description')
        }),
        ('Contact info', {
            'fields': ('phone', 'address')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        })
    )
