from django.db import models
from django.db.models.aggregates import Count
from random import randint

class RandomManager(models.Manager):
    use_for_related_fields = True

    def random(self,**kwargs):
        count = self.aggregate(count = Count('id'))['count']
        try:
            random_index = randint(0,count-1)
            return self.all()[random_index]
        except:
            return self.all()

class Menu(models.Model):
    objects = RandomManager()

    name = models.CharField(max_length=20)
    last_date = models.DateTimeField(blank=True,null=True)
    # blank = form_valid
    # null = db
    create_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-create_date']

    def __str__(self):
        return self.name

# 맛집
class Restaurant(models.Model):
    name = models.CharField(max_length=30)
    kind = models.CharField(max_length=20)
    link = models.URLField()
    img_link = models.URLField()

    def __str__(self):
        return self.name