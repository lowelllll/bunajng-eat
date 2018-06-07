from django.conf.urls import url,include
from .views import MenuView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('menus',MenuView)

urlpatterns = [
    url(r'^',include(router.urls)),
]

