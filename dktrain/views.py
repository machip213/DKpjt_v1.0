from django.db import connection

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse


def index(request):
    return HttpResponse("Hello, World. You're at the polls index.")

def trains(request):
    return render(request, 'dktrain/index.html')

def info(request):
    departure = request.POST.get('departure')
    daytype = request.POST.get('dayType')
    time = request.POST.get('time')
    direction = request.POST.get('direction')
    endpoint = 0

    table_list = ['departure_time', 'departure_time2', 'departure_time3', 'departure_time4']
    table_index = 0
    if direction == '상행' :
        if daytype == '평일': # 평일 상행
            table_index = 0
        else: # 휴일 상행
            table_index = 1

        if departure == '구미':
            endpoint = 1

    else:
        if daytype == '평일': # 평일 하행
            table_index = 2
        else: # 휴일 하행
            table_index = 3

        if departure == '경산':
            endpoint = 1

    table_name = table_list[table_index]

    if endpoint == 0:
        with connection.cursor() as cursor:
            query = f"""
                SELECT 출발시간
                FROM {table_name}
                WHERE station_id = (SELECT station_id FROM station WHERE 역이름 = %s)
                AND 출발시간 >= %s
                ORDER BY 출발시간 ASC 
            """
            cursor.execute(query, [departure, time])

            departure_time = cursor.fetchall()

        return render(request, 'dktrain/info.html', {"trains" : departure_time, 'direction' : direction, 'daytype' : daytype, 'departure' : departure})

    else:
        return render(request, 'dktrain/info.html')



