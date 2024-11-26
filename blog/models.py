from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    country_name = models.CharField(max_length=50, default="")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('detail', kwargs={'pk': self.pk})


class Accommodation(models.Model):
    name = models.CharField(max_length=200)  # Numele unității de cazare
    latitude = models.FloatField()  # Latitudinea locației
    longitude = models.FloatField()  # Longitudinea locației
    address = models.CharField(max_length=300, blank=True, null=True)  # Adresa
    country = models.CharField(max_length=100)  # Țara
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)  # Prețul per noapte

    def __str__(self):
        return self.name
