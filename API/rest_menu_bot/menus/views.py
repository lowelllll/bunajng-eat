# -*- coding:utf-8 -*-
import datetime
from django.shortcuts import render
from rest_framework import viewsets , permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MenuSerializer,RestaurantSerializer
from .models import Menu,Restaurant

class MenuView(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @action(detail=False) # router add
    def random(self,request):
        today = datetime.datetime.now(datetime.timezone.utc)
        count = 0
        max_count = 30
        while count < max_count: # 최대 30번 미만만 돌리도록 함.
            menu = Menu.objects.random()
            if not menu.last_date:
                break
            dt = today - menu.last_date
            if dt.days > 6:
                break
            count += 1

        menu.last_date = today
        menu.save()
        serializer = self.get_serializer(menu)
        return Response(serializer.data)

class RestaurantListView(APIView):
    def get(self,request):
        restaurant = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurant,many=True)
        return Response(serializer.data)
