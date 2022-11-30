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

userEventInput.addEventListener('change' , (event) => countData.userEventText = event.target.value) // 이벤트 내용을 객체로 전송

// 이벤트와 이벤트 날짜를 선택 후 send 버튼 눌렀을 때 발생하는 함수
const countSubmitEvent = () => {
    if(userDate.value && userEventInput.value){
        eventText.innerText = countData.userEventText;
        userDate.value = '';
        userEventInput.value = '';
        countResetBtn.disabled = false;

        // 카운트 다운이 되고 있는 setInterval
        const setCountDown = setInterval(() => {
            const nowTime = new Date().getTime()
            const totalTime = (userSelect - nowTime) / 1000;
            const timeObj = {
                days : Math.floor(totalTime / 3600 / 24),
                hours : Math.floor((totalTime / 3600) % 24),
                minutes : Math.floor(totalTime / 60) % 60,
                seconds : Math.floor(totalTime % 60)
            }

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

        }, 1000)

        const countResetEvent = () => {
            clearInterval(setCountDown)
            timeArea.forEach((span) => {
                span.innerText = '00'
            })
            countResetBtn.disabled = true;
        }
        
        countResetBtn.addEventListener('click',countResetEvent) // 리셋

    }else{
        window.alert('내용을 입력해주세요')
    }
    
}

countSubmitBtn.addEventListener('click' , countSubmitEvent)// 시작

countForm.addEventListener('submit', (event) => event.preventDefault()) // send 버튼 보낼 때 기본 이벤트 막기


