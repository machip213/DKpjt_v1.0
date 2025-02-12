document.addEventListener('DOMContentLoaded', function () {
  // 요소 선택
  const mainDeparture = document.getElementById('main-departure');
  const stationList = document.getElementById('station-list');

  const dayTypeSelector = document.getElementById('day-type-selector');
  const dayTypeDropdown = document.getElementById('day-type-dropdown');
  const selectedDayType = document.getElementById('selected-day-type');

  const timeDisplay = document.getElementById('time-display');
  const timeDropdown = document.getElementById('time-dropdown');
  const hourListEl = document.getElementById('hour-list');
  const minuteListEl = document.getElementById('minute-list');
  const selectedHour = document.getElementById('selected-hour');
  const selectedMinute = document.getElementById('selected-minute');

  const directionSelector = document.getElementById('direction-selector');
  const directionDropdown = document.getElementById('direction-dropdown');
  const selectedDirection = document.getElementById('selected-direction');
  
  // 현재값 전송용 변수
  const departureInput = document.getElementById('departure-input');
    const dayTypeInput = document.getElementById('dayType-input');
  const timeInput = document.getElementById('time-input');
  const directionInput = document.getElementById('direction-input');

  // 폼 제출 전 데이터 설정
    document.getElementById('search-button').addEventListener('click', function () {
      departureInput.value = mainDeparture.innerText;
      dayTypeInput.value = selectedDayType.innerText;
      timeInput.value = selectedHour.innerText + ":" + selectedMinute.innerText;
      directionInput.value = selectedDirection.innerText;
    });


  // 공통 함수: 모든 드롭다운 닫기
  function closeAllDropdowns() {
    stationList.style.display = 'none';
    dayTypeDropdown.style.display = 'none';
    timeDropdown.style.display = 'none';
    directionDropdown.style.display = 'none';
  }

  // 출발지 드롭다운 토글
  mainDeparture.addEventListener('click', function (event) {
    event.stopPropagation();
    if (stationList.style.display === 'block') {
      stationList.style.display = 'none';
    } else {
      closeAllDropdowns();
      stationList.style.display = 'block';
    }
  });

  // 출발지 목록 선택 시 업데이트
  document.querySelectorAll('#station-list li').forEach(item => {
    item.addEventListener('click', function () {
      mainDeparture.textContent = this.dataset.departure;
      stationList.style.display = 'none';
      closeAllDropdowns();
    });
  });

  // 평일/휴일 드롭다운 토글
  dayTypeSelector.addEventListener('click', function (event) {
    event.stopPropagation();
    if (dayTypeDropdown.style.display === 'block') {
      dayTypeDropdown.style.display = 'none';
    } else {
      closeAllDropdowns();
      dayTypeDropdown.style.display = 'block';
    }
  });

  // 평일/휴일 옵션 선택 시 업데이트
  document.querySelectorAll('#day-type-dropdown li').forEach(item => {
    item.addEventListener('click', function () {
      selectedDayType.textContent = this.textContent;
      dayTypeDropdown.style.display = 'none';
      closeAllDropdowns();
    });
  });

  // 시간 드롭다운 생성 (시: 00~23)
  for (let i = 0; i < 24; i++) {
    const li = document.createElement('li');
    li.textContent = String(i).padStart(2, '0');
    hourListEl.appendChild(li);
  }
  // 시간 드롭다운 생성 (분: 00~50, 10분 단위) – '분' 텍스트 없이 숫자만 표시
  for (let i = 0; i < 60; i += 10) {
    const li = document.createElement('li');
    li.textContent = String(i).padStart(2, '0');
    minuteListEl.appendChild(li);
  }

  // 시간 드롭다운 토글 (시간 또는 분 영역 클릭 시)
  timeDisplay.addEventListener('click', function (event) {
    event.stopPropagation();
    if (timeDropdown.style.display === 'block') {
      timeDropdown.style.display = 'none';
    } else {
      closeAllDropdowns();
      timeDropdown.style.display = 'block';
    }
  });

  // 시/분 옵션 선택 시 업데이트 후 드롭다운 닫기
  hourListEl.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      selectedHour.textContent = event.target.textContent;
      timeDropdown.style.display = 'none';
    }
  });
  minuteListEl.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      selectedMinute.textContent = event.target.textContent;
      timeDropdown.style.display = 'none';
    }
  });

  // 운행 방향 드롭다운 토글
  directionSelector.addEventListener('click', function (event) {
    event.stopPropagation();
    if (directionDropdown.style.display === 'block') {
      directionDropdown.style.display = 'none';
    } else {
      closeAllDropdowns();
      directionDropdown.style.display = 'block';
    }
  });
  // 운행 방향 옵션 선택 시 업데이트
  directionDropdown.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      selectedDirection.textContent = event.target.textContent;
      directionDropdown.style.display = 'none';
    }
  });

  // 페이지 바깥쪽 클릭 시 모든 드롭다운 닫기
  document.addEventListener('click', function () {
    closeAllDropdowns();
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const loadMoreButton = document.getElementById("load-more");
    const trainRows = document.querySelectorAll(".train-row");

    if (!loadMoreButton) {
        console.error("❌ '더보기' 버튼을 찾을 수 없습니다.");
        return;
    }

    if (!trainRows.length) {
        console.error("❌ 열차 정보가 없습니다.");
        loadMoreButton.style.display = "none";
        return;
    }

    loadMoreButton.addEventListener("click", function () {
        console.log("✅ '더보기' 버튼 클릭됨");

        let hiddenRows = document.querySelectorAll(".train-row.hidden");

        if (hiddenRows.length === 0) {
            console.warn("⚠️ 더 이상 표시할 데이터가 없습니다.");
            loadMoreButton.style.display = "none";
            return;
        }

        for (let i = 0; i < 4; i++) {
            if (hiddenRows[i]) {
                hiddenRows[i].classList.remove("hidden");
            }
        }

        hiddenRows = document.querySelectorAll(".train-row.hidden");
        if (hiddenRows.length === 0) {
            console.log("🎉 모든 데이터가 표시됨, 버튼 숨김");
            loadMoreButton.style.display = "none";
        }
    });
});
