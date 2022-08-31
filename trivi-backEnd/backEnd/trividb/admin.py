from django.contrib import admin
from django.apps import apps
from .models import *
from import_export.admin import ExportActionMixin


# all other models
models = apps.get_models()

class CustomerAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ('customer_id','full_name')


for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
# Register your models here.
