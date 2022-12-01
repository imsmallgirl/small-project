// touch-slider

const touchSliderWrap = document.getElementById('touch-slider-wrap') // 터치 슬라이더 전체
const touchSlider = document.getElementById('touch-slider') //터치 슬라이더 컨텐츠 wrap
const touchSlides = document.querySelectorAll('#touch-slider li') // 터치 슬라이드 컨텐츠들

const touchBtns = document.querySelectorAll('#touch-btn li') // 터치 슬라이드 버튼들

const touchNav = document.querySelectorAll('#touch-nav li')// 터치 슬라이드 네비게이터들

const touchSliderWidth = touchSlider.clientWidth; // 총 슬라이드 width

const totalTouchSlide = touchSlides.length - 1; // 총 슬라이드 갯수

let touchCurrentIndex = 0; // 현재 슬라이드 index

// 터치 네비게이션 함수
const touchNavEvent = (touchCurrentIndex) => {
    touchNav.forEach((nav) => {
        nav.classList.remove('touch-nav-on')
    })
    touchNav[touchCurrentIndex].classList.add('touch-nav-on')
}

// 터치 왼쪽 버튼 이벤트
const touchLeftEvent = () => {
    touchCurrentIndex--;
    if(touchCurrentIndex < 0){
        touchCurrentIndex = totalTouchSlide;
    }
    touchSlider.style.left = `calc(100% * -${touchCurrentIndex})`
    touchNavEvent(touchCurrentIndex)
}

// 터치 오른쪽 버튼 이벤트
const touchRightEvent = () => {
    touchCurrentIndex++;
    if(touchCurrentIndex > totalTouchSlide){
        touchCurrentIndex = 0;
    }
    touchSlider.style.left = `calc(100% * -${touchCurrentIndex})`
    touchNavEvent(touchCurrentIndex)
}

// 왼쪽, 오른쪽 슬라이드 버튼 이벤트 부여해주기.
touchBtns.forEach((touchBtn) => {
    touchBtn.addEventListener('click', () => {
        if(touchBtn.id === 'touch-left'){
            touchLeftEvent()
        }else{
            touchRightEvent()
        }
    })
})

let startPoint = 0; //처음 마우스 드래그한 포인트 지점
let endPoint = 0; // 마지막으로 마우스를 드래그 끝낸 포인트 지점

// 드래그 시작할 시점
touchSlider.addEventListener('mousedown', (e) => {
    startPoint = e.pageX;
})

// 드래그 끝난 시점
touchSlider.addEventListener('mouseup', (e) => {
    endPoint = e.pageX;
    if(startPoint < endPoint){
        touchLeftEvent();
    }else if(startPoint > endPoint){
        touchRightEvent();
    }
})


// middle slider

const middleSliderWrap = document.getElementById('middle-slider-wrap')// 중간 슬라이더 전체

const middleSlider = document.getElementById('middle-slider') // 중간 슬라이드 컨텐츠 감싸고 있는 컨테이너

const middleSlides = document.querySelectorAll('#middle-slider li') // 중간 슬라이드들

const middleBtns = document.querySelectorAll('#middle-btn li')

const totalMiddleSlide = middleSlides.length - 1; // 총 중간 슬라이드 개수

let middleCurrentIndex = 0; // 현재 중간 슬라이드 index

// 슬라이드 이동 이벤트
const middleSliderEvent = (num) => {
    // 모든 슬라이드 클래스 초기화 작업
    middleSlides.forEach((slide) => {
        slide.classList.remove('middle-current', 'middle-next', 'middle-prev')
    })

    // 현재 index 인 슬라이드에게 이벤트
    const currentSlide = middleSlides[num];
    currentSlide.classList.remove('middle-current', 'middle-next', 'middle-prev')
    currentSlide.classList.add('middle-current')

    // 이전 슬라이드
    const prevSlide = (num == 0) ? middleSlides[totalMiddleSlide] : middleSlides[num - 1];
    prevSlide.classList.remove('middle-current', 'middle-next', 'middle-prev')
    prevSlide.classList.add('middle-prev')

    // 다음 슬라이드
    const nextSlide = middleSlides[(num + 1) % (totalMiddleSlide + 1)];
    nextSlide.classList.remove('middle-current', 'middle-next', 'middle-prev')
    nextSlide.classList.add('middle-next')
}

// 처음 슬라이드 시작

window.onload = () => {
    middleSliderEvent(0)
}


// 왼쪽 버튼 클릭이벤트
const middleLeftEvent = () => {
    middleCurrentIndex--;
    if(middleCurrentIndex < 0){
        middleCurrentIndex = totalMiddleSlide
    }
    middleSliderEvent(middleCurrentIndex)
}


// 오른쪽 버튼 클릭이벤트
const middleRightEvent = () => {
    middleCurrentIndex++;
    if(middleCurrentIndex > totalMiddleSlide){
        middleCurrentIndex = 0;
    }
    middleSliderEvent(middleCurrentIndex)
}

// 슬라이드 이동 버튼들에게 클릭 이벤트주기
middleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(btn.id === 'middle-left'){
            middleLeftEvent()
        }else {
            middleRightEvent()
        }
    })
})




