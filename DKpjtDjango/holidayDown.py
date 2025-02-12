import pandas as pd
from sqlalchemy import create_engine

df = pd.read_excel("daekyong.xlsx", sheet_name="휴일 하행", header=None)

weekup_start_station = df.iloc[0, 1:].tolist()
weekup_end_station = df.iloc[1, 1:].tolist()
weekup_train_numbers = df.iloc[2, 1:].tolist()

weekup_depart_times_dict = {}
uprecord = []

for i in range(3, 28, 2):
    up_station_name = df.iloc[i, 0]  # i행 0번열에 역이름
    if i < 27:
        weekup_depart_times = df.iloc[
            i + 1, 1:
        ]  # 출발시간 기본적으로 역이름 아래 행에 있음
        if weekup_depart_times.isnull().all():  # 아래 행에 없으면
            weekup_depart_times = df.iloc[i, 1:]  # 바로 옆 행
            if weekup_depart_times.isnull().all():  # 옆 행도 없으면 스킵
                continue
    else:
        weekup_depart_times = df.iloc[i, 1:]  # 바로 옆 행
        if weekup_depart_times.isnull().all():  # 옆 행도 없으면 스킵
            continue

    clean_data = weekup_depart_times.dropna().tolist()
    weekup_depart_times_dict[up_station_name] = clean_data

for station, times in weekup_depart_times_dict.items():
    for time in times:
        time = time.strftime("%H:%M:%S")
        uprecord.append({"역이름": station, "출발": time})

df = pd.DataFrame(uprecord)
engine = create_engine(
    "mysql+pymysql://root:Chip0718!@127.0.0.1:3306/dktime", echo=True
)
df.to_sql(name="dktime4", con=engine, if_exists="replace", index=False)
