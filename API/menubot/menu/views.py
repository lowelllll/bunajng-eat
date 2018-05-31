from django.shortcuts import render
from django.http import JsonResponse
import datetime
from .models import Menu

# Create your views here.

def select_menu(request):
    data = {}
    if request.method == 'GET':
        today = datetime.datetime.now(datetime.timezone.utc)
        while True:
            # 1부터 현재 모델 갯수 -1 까지의 난수
            menu = Menu.objects.random()
            if not menu.last_date:
                break
            dt = today - menu.last_date
            if dt.days > 6:
               break
            print(menu.name+"먹음")
        data = {'id':menu.pk,'name':menu.name,'last_date':menu.last_date}
        # menu.last_date = today
        # menu.save()
    return JsonResponse(data)

def ate_menu(request,pk):
    return True

def create_menu(request):
    return JsonResponse()

def delete_menu(request):
    return JsonResponse()
