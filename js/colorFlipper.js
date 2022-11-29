// color-flipper 기능

const changeColorBtn = document.getElementById("color-btn") // 색상 바꾸는 버튼

const changeColor = document.getElementById("colors") // 바뀐 색상 미리보기 공간

const changeColorText = document.querySelector("#colors-text")// 바뀐 색상 코드 기입란

const copyPopUp = document.getElementById("copy-popup")

// 랜덤 색상 뽑는 코드와, ui에 보이게 하는 함수
const changeColorEvent = () => {
    let randomColor = "#"+Math.round(Math.random() * 0xffffff).toString(16);
    changeColor.style.backgroundColor = randomColor;
    changeColorText.innerText = `background-color : ${randomColor};`
}

changeColorBtn.addEventListener("click" , changeColorEvent) // 색상 바뀌게 하는 클릭 이벤트

// 색상 코드 입력란 클릭 시 자동으로 복사되는 함수

const copyColorCode = () => {
    let clipboard = new ClipboardJS(changeColorText)
    clipboard.on('success', (e) => {
        copyPopUp.innerText = "Copy!"
        copyPopUp.classList.add('copy-on')
        setTimeout(() => {
            copyPopUp.classList.remove('copy-on')
        }, 5000)
    })
    clipboard.on('error', (e) => {
        copyPopUp.innerText = "Error!"
        copyPopUp.classList.add('copy-on')
        setTimeout(() => {
            copyPopUp.classList.remove('copy-on')
        }, 5000)
    })
}

copyColorCode()

