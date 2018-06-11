# -*- coding:utf-8 -*-
"""
구로 디지털 단지역의 맛집을 망고 플레이트에서 크롤링해 DB에 저장합니다
"""
import requests
from bs4 import BeautifulSoup as bs

# django 환경 셋업
import os
from django.core.wsgi import get_wsgi_application

os.environ['DJANGO_SETTINGS_MODULE'] = 'rest_menu_bot.settings'
application = get_wsgi_application()

import django
django.setup()

from menus.models import Restaurant

def restaurant_parser():
    BASE_URL = 'https://www.mangoplate.com'
    data = []

    for page in range(1, 5):
        req = requests.get(
            "https://www.mangoplate.com/search/%EA%B5%AC%EB%A1%9C%EB%94%94%EC%A7%80%ED%84%B8%EB%8B%A8%EC%A7%80%EC%97%AD?keyword=%EA%B5%AC%EB%A1%9C%EB%94%94%EC%A7%80%ED%84%B8%EB%8B%A8%EC%A7%80%EC%97%AD&page={}".format(
                page))
        html = req.text
        soup = bs(html, 'html.parser')

        titles = soup.findAll('h2', {'class': 'title'})
        imgs = soup.findAll('img', {'class': 'center-croping'})
        kinds = soup.findAll('p', {'class': 'etc'})
        links = soup.findAll('a', {'class': 'only-desktop_not'})

        for i in range(len(titles)):
            link = BASE_URL + links[i]['href']
            data.append({
                'title': titles[i].text,
                'kind': kinds[i].text,
                'link': link,
                'img_link': imgs[i]['data-original']
            })

    return data

if __name__ == "__main__":
    restaruants = restaurant_parser()
    for restaruant in restaruants:
        Restaurant(
            name=restaruant['title'],
            kind=restaruant['kind'],
            link=restaruant['link'],
            img_link=restaruant['img_link']
        ).save()



