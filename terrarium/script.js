// console.log(document.getElementById('plant1'))
// dragElement(document.getElementById('plant1'))
// dragElement(document.getElementById('plant2'))
// dragElement(document.getElementById('plant3'))
// dragElement(document.getElementById('plant4'))
// dragElement(document.getElementById('plant5'))
// dragElement(document.getElementById('plant6'))
// dragElement(document.getElementById('plant7'))
// dragElement(document.getElementById('plant8'))
// dragElement(document.getElementById('plant9'))
// dragElement(document.getElementById('plant10'))
// dragElement(document.getElementById('plant11'))
// dragElement(document.getElementById('plant12'))
// dragElement(document.getElementById('plant13'))
// dragElement(document.getElementById('plant14'))


// let highestZIndex = 1; // 가장 높은 z-index를 저장할 변수

// function dragElement(terrariumElement) {
//     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     terrariumElement.onpointerdown = pointerDrag;

//     // 더블 클릭 시 요소를 가장 위로 가져오는 기능
//     terrariumElement.ondblclick = function () {
//         highestZIndex++; // 현재 z-index의 최대값을 증가시킴
//         terrariumElement.style.zIndex = highestZIndex; // 해당 요소의 z-index를 가장 큰 값으로 설정
//     };

//     function pointerDrag(e) {
//         e.preventDefault();
//         pos3 = e.clientX; // 마우스의 초기 X 위치
//         pos4 = e.clientY; // 마우스의 초기 Y 위치

//         // 마우스 움직임과 관련된 이벤트를 설정
//         document.onpointermove = elementDrag;
//         // 마우스 버튼을 뗐을 때 드래그 중지
//         document.onpointerup = stopElementDrag;
//     }

//     function elementDrag(e) {
//         pos1 = pos3 - e.clientX; // 마우스의 X 이동 거리
//         pos2 = pos4 - e.clientY; // 마우스의 Y 이동 거리
//         pos3 = e.clientX; // 현재 마우스 X 위치 갱신
//         pos4 = e.clientY; // 현재 마우스 Y 위치 갱신

//         // 요소의 새로운 위치 계산 및 적용
//         terrariumElement.style.top = (terrariumElement.offsetTop - pos2) + 'px';
//         terrariumElement.style.left = (terrariumElement.offsetLeft - pos1) + 'px';
//     }

//     function stopElementDrag() {
//         // 마우스 버튼을 떼면 이벤트를 제거하여 드래그 중지
//         document.onpointerup = null;
//         document.onpointermove = null;
//     }
// }



let highestZIndex = 1; // 가장 높은 z-index를 저장할 변수

// 모든 plant 요소에 대해 이벤트 추가
document.querySelectorAll('.plant').forEach(plant => {
    plant.setAttribute('draggable', true); // draggable 속성 추가
    plant.addEventListener('dragstart', dragStart); // 드래그 시작 이벤트
    plant.addEventListener('dblclick', bringToFront); // 더블 클릭 시 z-index 조정
});

// 드래그가 시작될 때 호출
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    highestZIndex++; // z-index 증가
    e.target.style.zIndex = highestZIndex;
}

// 드래그 오버 이벤트 - 기본 동작 방지
document.addEventListener('dragover', function (e) {
    e.preventDefault(); // 기본 드롭 방지
});

// 드롭 이벤트 - 위치 변경
document.addEventListener('drop', function (e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const plant = document.getElementById(id);

    // 마우스 위치에 맞게 plant의 위치 변경
    const newX = e.clientX - plant.offsetWidth / 2;
    const newY = e.clientY - plant.offsetHeight / 2;

    plant.style.left = `${newX}px`;
    plant.style.top = `${newY}px`;
});

// 더블 클릭 시 z-index 조정
function bringToFront(e) {
    highestZIndex++;
    e.target.style.zIndex = highestZIndex;
}
