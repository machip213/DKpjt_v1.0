/* (공통) 1번 역 id 테이블 생성
CREATE TABLE station (
	station_id INT AUTO_INCREMENT PRIMARY KEY,
    역이름 VARCHAR(10) UNIQUE
);
*/

/* (공통) 역 id 테이블에 역이름 삽입
INSERT INTO station (역이름)
SELECT DISTINCT 역이름 FROM dktime;
*/




/* 평일상행 출발시간 테이블 생성(외래키 station id)
CREATE TABLE departure_time (
	id INT AUTO_INCREMENT PRIMARY KEY,
    station_id int,
    출발시간 CHAR(8),
    FOREIGN KEY (station_id) REFERENCES station(station_id)
);
*/

/*평일상행 station 역이름과 dktime 역이름 같은행 JOIN 후 station 테이블에 있는 id 입력
INSERT INTO departure_time (station_id, 출발시간)
SELECT s.station_id, d.출발
FROM dktime AS d
JOIN station AS s ON d.역이름 = s.역이름;
*/




/* 휴일상행 출발시간 테이블 생성(외래키 station id)
CREATE TABLE departure_time2 (
	id INT AUTO_INCREMENT PRIMARY KEY,
    station_id int,
    출발시간 CHAR(8),
    FOREIGN KEY (station_id) REFERENCES station(station_id)
);
*/

/*주말상행 station 역이름과 dktime 역이름 같은행 JOIN 후 station 테이블에 있는 id 입력
INSERT INTO departure_time2 (station_id, 출발시간)
SELECT s.station_id, d.출발
FROM dktime2 AS d
JOIN station AS s ON d.역이름 = s.역이름;
*/




/* 평일 하행
CREATE TABLE departure_time3 (
	id INT AUTO_INCREMENT PRIMARY KEY,
    station_id int,
    출발시간 CHAR(8),
    FOREIGN KEY (station_id) REFERENCES station(station_id)
);
*/

/* 평일 하행
INSERT INTO departure_time3 (station_id, 출발시간)
SELECT s.station_id, d.출발
FROM dktime3 AS d
JOIN station AS s ON d.역이름 = s.역이름;
*/





/* 주말 하행
CREATE TABLE departure_time4 (
	id INT AUTO_INCREMENT PRIMARY KEY,
    station_id int,
    출발시간 CHAR(8),
    FOREIGN KEY (station_id) REFERENCES station(station_id)
);
*/

/* 주말 하행
INSERT INTO departure_time4 (station_id, 출발시간)
SELECT s.station_id, d.출발
FROM dktime4 AS d
JOIN station AS s ON d.역이름 = s.역이름;
*/ 
