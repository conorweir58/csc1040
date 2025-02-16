from django.shortcuts import render, get_object_or_404
from .models import *

def index(request):
    return render(request, 'index.html')

def view_all_books(request):
    all_books = MyBook.objects.all()
    return render(request, 'all_books.html', {'books':all_books})

def single_book(request, bookid):
    single_book = get_object_or_404(MyBook, id = bookid)
    return render(request, 'single_book.html', {'book': single_book})

def year(request):
    all_years = MyBook.objects.order_by('year').values_list('year', flat=True).distinct()
    return render(request, 'year.html', {'years': all_years})

def book_by_year(request, yearid):
    books = MyBook.objects.filter(year=yearid)
    return render(request, 'book_by_year.html', {'books': books})

def category(request):
    all_categories = MyBook.objects.order_by('category').values_list('category', flat=True).distinct()
    return render(request, 'category.html', {'categories': all_categories})

def book_by_category(request, categoryid):
    books = MyBook.objects.filter(category=categoryid.upper())
    return render(request, 'book_by_category.html', {'books': books})

def book_by_category_and_year(request, categoryid, yearid):
    books = MyBook.objects.filter(category=categoryid.upper(), year=yearid)
    return render(request, 'book_by_category_and_year.html', {'books': books})

