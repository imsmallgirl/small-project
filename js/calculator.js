const calBody = document.querySelectorAll(".cal-body")
// 버튼이 속해있는 div 전체 갖고오기
const calResultArea = document.getElementById("cal-value")
// 결과 값을 보여줄 공간 갖고오기


// 숫자 render함수
const renderResult = (number) => {
    calResultArea.textContent = number;
}



// 숫자 값을 저장하는 곳
const calcValueObj = {
    currentValue : 0, // 현재 값(계산된값)
    temp : 0, //임시로 저장된 값
    operator : '', // 연산자
}

// 숫자 값을 저장하는 함수
const setNumber = (value) => {
    if(calcValueObj.operator){
        const result = String(calcValueObj.temp) + value;
        calcValueObj.temp = Number(result);
        renderResult(calcValueObj.temp);
    }else{
        const result = String(calcValueObj.currentValue) + value;
        calcValueObj.currentValue = Number(result);
        renderResult(calcValueObj.currentValue)
    }
}

// 계산하는 함수
const calculator = () => {
    switch (calcValueObj.operator){
        case '+' : {
            calcValueObj.currentValue += calcValueObj.temp;
            break;
        }
        case '-' : {
            calcValueObj.currentValue -= calcValueObj.temp;
            break;
        }
        case 'X' : {
            calcValueObj.currentValue *= calcValueObj.temp;
            break;
        }
        case '÷' : {
            calcValueObj.currentValue /= calcValueObj.temp;
            break;
        }
        case '%' : {
            calcValueObj.currentValue %= calcValueObj.temp;
            break;
        }
        case '+/-' : {
            calcValueObj.currentValue **= calcValueObj.temp;
            break;
        }
        default : {
            break;
        }
    }

    calcValueObj.temp = 0;
}


// 연산자 버튼을 클릭했을 때 발생시킬 함수
const setCalc = (value) => {
    if(calcValueObj.currentValue && calcValueObj.temp){
        calculator();
        renderResult(calcValueObj.currentValue)
    }
    calcValueObj.operator = value;
}

// 리셋하는 함수
const calcReset = () => {
    calcValueObj.currentValue = 0;
    calcValueObj.temp = 0;
    calcValueObj.operator = '';
    renderResult(0)
}

// 계산 끝내는 함수
const calcEnd = () => {
    calculator();
    renderResult(calcValueObj.currentValue);
    calcValueObj.operator = ''
}



// 초기 설정 함수
const calcInit = () => {
    // 계산기 버튼들에게 클릭 이벤트 부여해주기.
    calBody.forEach((button) => {
        button.addEventListener('click', (event) => {
            let calcResult = 0;
            const {value} = event.target

            if(/[0-9]/.test(value)){
                return setNumber(value);
            }else if(value === 'AC'){
                return calcReset();
            }else if(value === '='){
                return calcEnd();
            }else {
                return setCalc(value);
            }
        })
    });
    renderResult(0);
}


calcInit()
