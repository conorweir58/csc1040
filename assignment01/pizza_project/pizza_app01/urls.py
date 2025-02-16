from django.contrib import admin
from django.urls import path, include
from . import views
from .forms import *


urlpatterns = [
    path('', views.index, name="index"),
    path('register/', views.UserSignupView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(template_name="login.html", authentication_form=UserLoginForm), name="login"),
    path('logout/', views.logout_user, name="logout"),
    path('order/', views.order_pizza, name="order"),
    path('pay/', views.pay_deliver_pizza, name="pay_deliver"),
]
