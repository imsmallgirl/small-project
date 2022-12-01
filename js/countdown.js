const userDate = document.getElementById('count-date')
// 유저가 날짜와 시간을 선택하는 input
const userEventInput = document.getElementById('count-event') // 유저가 작성 이벤트 내용의 input
const countSubmitBtn = document.getElementById('count-submit') // 이벤트 내용과, 이벤트 날짜 시간을 정한 뒤 submit 해주는 버튼
const countForm = document.getElementById('count-form')
// submit 이벤트 방지하기 위해서 불러오기
const timeArea = document.querySelectorAll("#count-time ul li span") // count 가 보이는 곳
const eventText = document.getElementById('count-event-title')
// 이벤트 제목이 보이도록 하기.
const countResetBtn = document.getElementById('count-reset')

let countData = {
    userSelectOk : false, // 유저가 선택하면 count 가 보이도록 해주기 위해서 변수 만듬.
    userEventText : '',
}

let userSelect ; // 유저가 선택한 date

//date 선택하는 라이브러리 함수
flatpickr(userDate, {
    dateFormat: "Y-m-d H:i",
    disableMobile: "true",
    enableTime: true,
    "plugins": [new confirmDatePlugin({})],
    onChange : (dateStr) => {
        userSelect = dateStr[0].getTime() // 유저가 선택한 시간을 전역변수에 대입
        return countData.userSelectOk = true // 선택을 끝내면, count가 보이도록 true 로 변경
    }
});

userEventInput.addEventListener('change' , (event) => countData.userEventText = event.target.value) // 이벤트 이름을 객체로 전송

countForm.addEventListener('submit', (event) => event.preventDefault()) // send 버튼 보낼 때 기본 이벤트 막기

let timeOut = false;

// 받은 date로 계산하고 , 렌더링해주는 함수
const Timer = (totalTime) => {

        const timeObj = {
            days : Math.floor(totalTime / 3600 / 24),
            hours : Math.floor((totalTime / 3600) % 24),
            minutes : Math.floor(totalTime / 60) % 60,
            seconds : Math.floor(totalTime % 60)
        } // 바꾼 시간을 일 , 시간, 분, 초 단위로 계산한 object
    
        timeArea.forEach((span) => {
            if(span.id === 'day'){
                span.innerText = timeObj.days < 10 ? `0${timeObj.days}` : timeObj.days
            }
            if(span.id === 'hour'){
                span.innerText = timeObj.hours < 10 ? `0${timeObj.hours}` : timeObj.hours
            }
            if(span.id === 'minute'){
                span.innerText = timeObj.minutes < 10 ? `0${timeObj.minutes}` : timeObj.minutes
            }
            if(span.id === 'second'){
                span.innerText = timeObj.seconds < 10 ? `0${timeObj.seconds}` : timeObj.seconds
            }
        })
    
}

//리셋을 실행시킬 함수
const resetEvent = (setCountDown) => {
    // 리셋 버튼을 눌렀을 때 발생시킬 함수
    const countResetEvent = () => {
        clearInterval(setCountDown)
        timeArea.forEach((span) => {
            span.innerText = '00'
        })
        localStorage.removeItem('eventContents')
        eventText.innerText = 'create an event'
        countResetBtn.disabled = true;
        countForm.classList.remove('count-out')
    }
        
    countResetBtn.addEventListener('click', countResetEvent) // 리셋
}

// 이벤트와 이벤트 날짜를 선택 후 send 버튼 눌렀을 때 발생하는 함수
const countSubmitEvent = () => {
        countForm.classList.remove('count-out')
        if(userDate.value && userEventInput.value){
            eventText.innerText = countData.userEventText;
            userDate.value = '';
            userEventInput.value = '';
            countResetBtn.disabled = false;
            countForm.classList.add('count-out')
    
            // 카운트 다운이 되고 있는 setInterval
            const setCountDown = setInterval(() => {
                const nowTime = new Date().getTime()
                let totalTime = (userSelect - nowTime) / 1000; // 받은 date에서 현재 시간 빼고 초단위로 변경
                Timer(totalTime)
                // 카운트 다운이 끝났을 시 발생시킬 함수
                if(totalTime <= 0){
                    clearInterval(setCountDown)
                    timeArea.forEach((span) => {
                        span.innerText = '00'
                    })
                    document.getElementById('count-end-title').innerText = countData.userEventText
                    document.getElementById('count-end').classList.add('count-popup')
                    setTimeout(() => {
                        document.getElementById('count-end').classList.remove('count-popup')
                    }, 5000)
                }
            }, 1000)
    
            let eventObj = {eventTitle : countData.userEventText, eventDate : userSelect}
            const eventObjString = JSON.stringify(eventObj);
            localStorage.setItem('eventContents', eventObjString)
    
            resetEvent(setCountDown);
        }else{
            window.alert('내용을 입력해주세요')
        }
}

// localStorage에 등록해놓은 이벤트가 있을 경우, 새로고침해도 이전 이벤트 카운트다운이 실행 될 수 있도록 하기.
if(localStorage.getItem('eventContents')){
    countForm.classList.add('count-out')
    const eventContentsObj = localStorage.getItem('eventContents')
    const eventLocalItem = JSON.parse(eventContentsObj)

    eventText.innerText = eventLocalItem.eventTitle;
    countResetBtn.disabled = false;


    const setCountDown = setInterval(() => {
        const nowTime = new Date().getTime()
        let totalTime = (eventLocalItem.eventDate - nowTime) / 1000; // 받은 date에서 현재 시간 빼고 초단위로 변경
        Timer(totalTime)
        // 카운트 다운이 끝났을 시 발생시킬 함수
        if(totalTime <= 0){
            clearInterval(setCountDown)
            timeArea.forEach((span) => {
                span.innerText = '00'
            })
            document.getElementById('count-end-title').innerText = eventLocalItem.eventTitle;
            document.getElementById('count-end').classList.add('count-popup')
            setTimeout(() => {
                document.getElementById('count-end').classList.remove('count-popup')
            }, 5000)
        }
    }, 1000)

    resetEvent(setCountDown)
}

countSubmitBtn.addEventListener('click' , countSubmitEvent)// 시작



