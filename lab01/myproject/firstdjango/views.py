from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'index.html')

def contact(request):
    return render(request, 'contact.html')


# Done in lecture 21/01/25
# def profile(request, name):
#     area = request.GET.get('area', 'Dublin')
#     return render(request, 'profile.html', {'name': name, 'area': area})
