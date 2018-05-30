from django.shortcuts import render
from django.http import JsonResponse
from .models import Menu
# Create your views here.

def select_menu(request):
    data = {}
    if request.method == 'GET':
        menu = Menu.objects.random()
        data['menu'] = list(menu)
    return JsonResponse(data)

def create_menu(request):
    return JsonResponse()

def delete_menu(request):
    return JsonResponse()
