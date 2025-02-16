from django.db import models

# Use this as a reference to create your model called Book !
class MyBook(models.Model):
   id = models.AutoField(primary_key=True)
   title = models.TextField()
   author = models.CharField(max_length=10)
   year = models.IntegerField()
   price = models.DecimalField(max_digits=5, decimal_places=2) # number from 0.0-999.99
   synopsis = models.TextField()
   category_choices = [
      ('FICTION', 'fiction'),
      ('HORROR', 'horror'),
      ('SCFI', 'scfi'),
      ('SPLATTER', 'splatter'),
      ('FANTASY', 'fantasy'),
   ]
   category = models.CharField(max_length=50, choices=category_choices, default='FICTION')
