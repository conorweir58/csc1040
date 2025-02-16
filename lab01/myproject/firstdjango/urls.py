from django.urls import path
from . import views

urlpatterns = [
   path('', views.index, name="index"),
   path('contact/', views.contact, name="contact"),
   # path('profile/<str:name>/<str:area>', views.profile, name="profile"),
]