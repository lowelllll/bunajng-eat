from django.conf.urls import url
from .views import *

app_name = 'menu'

urlpatterns = [
    url('^$',select_menu,name='select_menu'),
    url('^menus/$',list_menu,name='list_menu'),
    url('^create/$',create_menu,name='create_menu'),
    url('^delete/$',delete_menu,name='delete_menu'),
]