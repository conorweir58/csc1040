from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField(gettext_lazy("Email Address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

# PIZZA MODELS

class Size(models.Model):
    id = models.AutoField(primary_key=True)
    size = models.CharField(max_length=30)

    def __str__(self):
        return self.size

class Crust(models.Model):
    id = models.AutoField(primary_key=True)
    crust = models.CharField(max_length=30)

    def __str__(self):
        return self.crust

class Sauce(models.Model):
    id = models.AutoField(primary_key=True)
    sauce = models.CharField(max_length=30)

    def __str__(self):
        return self.sauce

class Cheese(models.Model):
    id = models.AutoField(primary_key=True)
    cheese = models.CharField(max_length=30)

    def __str__(self):
        return self.cheese

class Pizza(models.Model):
    # Pizza ID
    id = models.AutoField(primary_key=True)

    # Pizza Settings
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    sauce = models.ForeignKey(Sauce, on_delete=models.CASCADE)
    cheese = models.ForeignKey(Cheese, on_delete=models.CASCADE)
    crust = models.ForeignKey(Crust, on_delete=models.CASCADE)

    # Toppings
    pepperoni = models.BooleanField(default=False)
    chicken = models.BooleanField(default=False)
    ham = models.BooleanField(default=False)
    pineapple = models.BooleanField(default=False)
    peppers = models.BooleanField(default=False)
    mushrooms = models.BooleanField(default=False)
    onions = models.BooleanField(default=False)
    jalapeno = models.BooleanField(default=False)
    olives = models.BooleanField(default=False)
    garlic = models.BooleanField(default=False)
    bacon = models.BooleanField(default=False)
    anchovies = models.BooleanField(default=False)

    # possibly use queryset, etc. instead?
    def get_toppings(self):
        all_toppings = [('pepperoni', self.pepperoni),
                    ('chicken', self.chicken),
                    ('ham', self.ham),
                    ('pineapple', self.pineapple),
                    ('peppers', self.peppers),
                    ('mushrooms', self.mushrooms),
                    ('onions', self.onions),
                    ('jalapeno', self.jalapeno),
                    ('olives', self.olives),
                    ('garlic', self.garlic),
                    ('bacon', self.bacon),
                    ('anchovies', self.anchovies)]

        toppings = []

        for topping, value in all_toppings:
            if value:
                toppings.append(topping)

        return toppings

    def __str__(self):
        return f"{self.size} Pizza with {self.sauce} sauce, {self.cheese} cheese, {self.crust} crust and {', '.join(self.get_toppings())}."

# PAYMENT MODEL
class PayDeliver(models.Model):
    id = models.AutoField(primary_key=True)

    # Personal Details
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{10}$', 'Phone number must be 10 digits')])

    # Address + Billing Address
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    county = models.CharField(max_length=30)
    country = models.CharField(max_length=50)
    postcode = models.CharField(max_length=7)

    # Payment Details
    # ensures card_number again is 16 digits long (standard card number length) and there are no negative ints as '-' can't be inputted
    card_number = models.CharField(max_length=16, validators=[RegexValidator(r'^\d{16}$', 'Card number must be 16 digits')])
    expiry_month = models.PositiveIntegerField(validators=[MinValueValidator(1, 'Valid months are 1-12'), MaxValueValidator(12, 'Valid months are 1-12')])
    expiry_year = models.PositiveIntegerField(validators=[MinValueValidator(2025, 'Valid years are 2025-9999'), MaxValueValidator(9999, 'Valid years are 2025-9999')])
    cvv = models.CharField(max_length=3, validators=[RegexValidator(r'^\d{3}$', 'CVV must be 3 digits')])
    card_holder_name = models.CharField(max_length=50)

    def __str__(self):
        return f"Payment for {self.name}, ID: {self.id}"

# ORDER MODEL
class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pizza = models.ForeignKey(Pizza, on_delete=models.CASCADE)
    payment_deliver = models.ForeignKey(PayDeliver, on_delete=models.CASCADE, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)

