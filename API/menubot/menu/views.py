from django.shortcuts import render
from django.http import JsonResponse
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie,requires_csrf_token
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
        data = {
            'id':menu.pk,
            'name':menu.name,
            'last_date':menu.last_date
        }
        # menu.last_date = today
        # menu.save()

    return JsonResponse(data)

def ate_menu(request,pk): # 먹은 메뉴를 확인
    return True

# @requires_csrf_token
# @ensure_csrf_cookie
@csrf_exempt # csrf 임시 해제
def create_menu(request): # 새로운 메뉴 생성
    data = {}

    if request.method == 'POST':
        name = request.POST['name']
        menu = Menu(name=name)
        menu.save()

        data = {
            'id':menu.pk,
            'name':menu.name,
            'last_date':menu.last_date
        }

    return JsonResponse(data)

@csrf_exempt
def delete_menu(request): # 메뉴 삭제
    return JsonResponse()

def list_menu(request): # 메뉴 리스트
    data = {}

    if request.method == 'GET':
        menus = Menu.objects.all().values()
        data['menus'] = list(menus)

    return JsonResponse(data)
