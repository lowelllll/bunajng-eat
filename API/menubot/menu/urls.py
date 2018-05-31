from django.conf.urls import url
from .views import *

app_name = 'menu'

urlpatterns = [
    url('^$',select_menu,name='select_menu'),
    url('^menus/$',list_menu,name='list_menu'),
]