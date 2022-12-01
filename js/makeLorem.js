
const makeTextBtn = document.getElementById('make-text-btn') // 랜덤 텍스트 만드는 버튼
const makeResultArea = document.getElementById('text-result') // 랜덤 텍스트 결과 보여주는 곳
const makeNumberInput = document.getElementById('make-number')// 텍스트 length 작성하는 input
const makeTypeSelect = document.getElementById('select-text-type') //데이터 타입 정하기.

let textApiUrl ;
let typeValue = 'paragraphs'; // 옵션에서 선택한 타입값 넣기
let numberValue ; // 유저가 입력한 숫자 값을 전역변수에 넣어주기.

// 옵션에서 유저가 선택한 타입 값 갖고오기
makeTypeSelect.addEventListener('change', (event) => {
    typeValue = event.target.value;
})
// 숫자 input 에서 유저가 입력한 값 갖고오기
makeNumberInput.addEventListener('change', (event) => {
    numberValue = event.target.value;
})

// make 버튼 눌렀을 때 api 로 랜덤 텍스트 갖고오기
const handleMakeText = async () => {
    document.querySelector('.loading-container').style.display = 'block';
    makeResultArea.innerHTML = '';
    await axios({
        url: `https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=${typeValue}&number=${numberValue}`,
        method : "get",
        headers : {
           'X-Api-key' : '4812eab3bc6f4504b9e7ee355f874d74'
        }
    }).then((res) => {
        document.querySelector('.loading-container').style.display = 'none';
        makeResultArea.innerHTML = `<span class="text-result-span">${res.data}</span>`
    }).catch((error) => {
        makeResultArea.innerText = error.message
    })
    makeNumberInput.value = '';
}

makeTextBtn.addEventListener('click', handleMakeText)