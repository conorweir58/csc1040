# Generated by Django 5.1.5 on 2025-02-11 21:03

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pizza_app01', '0002_cheese_crust_sauce_size_pizza'),
    ]

    operations = [
        migrations.CreateModel(
            name='PayDeliver',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('fname', models.CharField(max_length=20)),
                ('phone', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator('^\\d{10}$', 'Phone number must be 10 digits')])),
                ('address1', models.CharField(max_length=50)),
                ('address2', models.CharField(blank=True, max_length=50)),
                ('city', models.CharField(max_length=30)),
                ('county', models.CharField(max_length=30)),
                ('country', models.CharField(max_length=50)),
                ('postcode', models.CharField(max_length=7)),
                ('card_number', models.CharField(max_length=16, validators=[django.core.validators.RegexValidator('^\\d{16}$', 'Card number must be 16 digits')])),
                ('expiry_month', models.PositiveIntegerField(max_length=2, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(12)])),
                ('expiry_year', models.PositiveIntegerField(max_length=4, validators=[django.core.validators.MinValueValidator(2025), django.core.validators.MaxValueValidator(9999)])),
                ('cvv', models.PositiveIntegerField(max_length=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999)])),
                ('card_holder_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date_ordered', models.DateTimeField(auto_now_add=True)),
                ('pizza', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizza_app01.pizza')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizza_app01.paydeliver')),
            ],
        ),
    ]
