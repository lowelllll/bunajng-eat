from django.shortcuts import render
from django.http import JsonResponse
import datetime
from .models import Menu

# Create your views here.

def select_menu(request): # 랜덤으로 메뉴를 고름
    data = {}
    if request.method == 'GET':
        today = datetime.datetime.now(datetime.timezone.utc)
        while True:
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

def ate_menu(request,pk): # 먹은 메뉴를 확인
    return True

def create_menu(request): # 새로운 메뉴 생성
    return JsonResponse()

def delete_menu(request): # 메뉴 삭제
    return JsonResponse()

def list_menu(request): # 메뉴 리스트
    data = {}

    if request.method == 'GET':
        menus = Menu.objects.all().values()
        data['menus'] = list(menus)

    return JsonResponse(data)
