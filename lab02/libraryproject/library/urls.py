from django.contrib.auth.urls import urlpatterns
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('variable',views.variable, name="variable"),
    path('random', views.random_number, name="random"),
    path('ex2', views.ex2, name="ex2"),
    path('fizzbuzz', views.fizzbuzz, name="fizzbuzz"),

]