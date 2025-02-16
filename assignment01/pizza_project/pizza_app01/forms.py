from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.forms import ModelForm, ModelChoiceField
from .models import *
from django.db import transaction
from datetime import datetime
from django.contrib.auth.forms import AuthenticationForm


class UserSignupForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    # rolls back the changes if anything goes wrong
    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_admin = False
        user.email = self.cleaned_data['username']
        user.save()
        return user

    def clean(self):
        super().clean()
        email = self.cleaned_data.get('username')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("A User with that email already exists")

        if '@' not in email and '.' not in email:
            raise forms.ValidationError("A valid email is required")

class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

class CreatePizzaForm(forms.ModelForm):
    class Meta:
        model = Pizza
        fields = [
            'size',
            'sauce',
            'cheese',
            'crust',
            'pepperoni',
            'chicken',
            'ham',
            'pineapple',
            'peppers',
            'mushrooms',
            'onions',
            'jalapeno',
            'olives',
            'garlic',
            'bacon',
            'anchovies'
        ]

class PayDeliverPizzaForm(forms.ModelForm):
    class Meta:
        model = PayDeliver
        fields = ['name', 'phone', 'address', 'city', 'county', 'country',
                  'postcode', 'card_number', 'expiry_month', 'expiry_year', 'cvv', 'card_holder_name']

    def clean(self):
        data = self.cleaned_data

        # PHONE VALIDATION
        phone = data['phone']

        if not phone.isdigit() or len(phone) != 10:
            raise forms.ValidationError("Invalid phone number. Please enter a valid phone number")

        # CARD_NUMBER VALIDATION
        card_number = data['card_number']

        if not card_number.isdigit() or len(card_number) != 16:
            raise forms.ValidationError("Invalid card number. Please enter a valid card number")

        # EXPIRY VALIDATION
        expiry_month = data['expiry_month']
        expiry_year = data['expiry_year']

        if expiry_month not in range(1, 13):
            raise forms.ValidationError("Invalid expiry date. Please enter a valid expiry date")

        if expiry_year < datetime.now().year:
            raise forms.ValidationError("Invalid expiry date. Please enter a valid expiry date")
        elif expiry_year == datetime.now().year:
            if expiry_month < datetime.now().month:
                raise forms.ValidationError("Invalid expiry date. Please enter a valid expiry date")

        # CVV VALIDATION
        cvv = data['cvv']

        if len(cvv) != 3:
            raise forms.ValidationError("Invalid CVV. Please enter a valid CVV")

        return data
