from django.conf.urls import url,include
from .views import MenuView,RestaurantListView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('menus',MenuView)

urlpatterns = [
    url(r'^',include(router.urls)),
    url(r'restaurants/$',RestaurantListView.as_view()),
]

