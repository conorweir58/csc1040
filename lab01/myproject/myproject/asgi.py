"""
ASGI config for myproject project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = get_asgi_application()

from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('your_app_name.urls')),# I called mine "firstdjango"
    path('admin/', admin.site.urls),
    ]   