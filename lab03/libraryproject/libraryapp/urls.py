from django.contrib.auth.urls import urlpatterns
from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.index, name="index"),
    path('books', view_all_books, name='all_books'),
    path('books/<int:bookid>', views.single_book, name='single_book'),
    path('books/year', views.year, name='year'),
    path('books/year/<int:yearid>', views.book_by_year, name='book_by_year'),
    path('books/category', views.category, name='category'),
    path('books/category/<str:categoryid>', views.book_by_category, name='book_by_category'),
    path('books/category/<str:categoryid>/year/<int:yearid>', views.book_by_category_and_year,name='book_by_category_and_year'),
]