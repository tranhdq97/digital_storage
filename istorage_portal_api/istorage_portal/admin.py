from django.contrib import admin
from .models import AppUser

# Register your models here.
class AppUserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'email', 'username', 'is_admin', 'is_staff')
    search_fields = ('email', 'username')
    readonly_fields = ('user_id', 'email', 'username', 'is_admin', 'is_staff')
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(AppUser, AppUserAdmin)