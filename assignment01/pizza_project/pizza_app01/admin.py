from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(User)
admin.site.register(Pizza)
admin.site.register(Crust)
admin.site.register(Cheese)
admin.site.register(Sauce)
admin.site.register(Size)
admin.site.register(PayDeliver)
admin.site.register(Order)
