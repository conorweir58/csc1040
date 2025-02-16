from datetime import timedelta

from .forms import *
from .models import *
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, logout
from django.views.generic import CreateView
from django.shortcuts import redirect
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required

# Create your views here.

def index(request):
    if request.user.is_authenticated:
        orders = Order.objects.filter(user=request.user).order_by('-date_ordered')

    else:
        orders = None

    return render(request, 'index.html', {'orders': orders})

class UserSignupView(CreateView):
    model = User
    form_class = UserSignupForm
    template_name = 'register.html'

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        return redirect('/login')

class UserLoginView(LoginView):
    template_name='login.html'

def logout_user(request):
    logout(request)
    return redirect('/')

@login_required
def order_pizza(request):
    if request.method == "POST":
        form = CreatePizzaForm(request.POST)

        if form.is_valid():
            pizza = form.save()
            request.session['pizza_id'] = pizza.id

            order = Order(user=request.user, pizza=pizza, payment_deliver=None)
            order.save()

            return redirect('/pay')
        else:
            return render(request, 'order_pizza.html', {'form': form})
    else:
        form = CreatePizzaForm()
        return render(request, 'order_pizza.html', {'form':form})

@login_required
def pay_deliver_pizza(request):
    pizza_id = request.session.get('pizza_id')

    if not pizza_id:
        return redirect('/order')  # No pizza ordered, force ordering

    if request.method == "POST":
        form = PayDeliverPizzaForm(request.POST)

        if form.is_valid():
            payment_deliver = form.save()

            order = Order.objects.filter(user=request.user, payment_deliver__isnull=True).order_by('-date_ordered').first()

            order.payment_deliver = payment_deliver
            order.save()

            del request.session['pizza_id']

            estimated_delivery = order.date_ordered + timedelta(minutes=30)

            return render(request, 'order_confirm.html', {'order': order, 'estimated_delivery': estimated_delivery})
        else:
            return render(request, 'pay_deliver.html', {'form': form})

    else:
        form = PayDeliverPizzaForm()
        return render(request, 'pay_deliver.html', {'form': form})

