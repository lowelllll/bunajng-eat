import datetime
from django.shortcuts import render
from .serializers import MenuSerializer
from .models import Menu
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class MenuView(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    @action(detail=False) # router add
    def random(self,request):
        today = datetime.datetime.now(datetime.timezone.utc)
        while True:
            menu = Menu.objects.random()
            if not menu.last_date:
                break
            dt = today - menu.last_date
            if dt.days > 6:
                break
        # menu.last_date = today
        # menu.save()

        serializer = self.get_serializer(menu)
        return Response(serializer.data)

