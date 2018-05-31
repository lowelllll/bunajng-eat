# -*- coding:UTF-8 -*-

from django.db import models
from django.db.models.aggregates import Count
from random import randint
# Create your models here.

# 모델 매니저 데이터베이스 쿼리와 연동되는 인터페이스
class RandomManager(models.Manager):
    use_for_related_fields = True # 이 모델을 가르키는 모든 관계 참조에서 모델 매니저를 사용할 수 있게 함

    def random(self,**kwargs):
        count = self.aggregate(count=Count('id'))['count']
        # aggreate 특정 필드를 더함
        # 필드 전체의 합이나 개수를 구할 때 사용함
        # Count id 필드 값의 개수를 구함.
        random_index = randint(0, count - 1) # 0부터 현재 모델 -1 까지의 난수
        return self.all()[random_index] # 객체를 랜덤으로 select

class Menu(models.Model):
    objects = RandomManager()

    name = models.CharField(max_length=20)
    last_date = models.DateTimeField(blank=True,null=True)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-create_date']

