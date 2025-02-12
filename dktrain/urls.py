from django.urls import path

from . import views

app_name = "dkpjt"

urlpatterns = [
    path('', views.index, name='index'),
    path('trains/', views.trains, name='trains'),
    path('info/', views.info, name='info'),
]