
const dateInput = document.getElementById('datePicker')

flatpickr(dateInput, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});

const dateWrap = document.querySelector("#date dl")
const dateLabel = document.querySelector("#date dl dd label")
const dateIcon = document.querySelector("#date dl dt")
dateLabel.addEventListener('mouseenter', () => {
    dateWrap.style.backgroundColor = `rgba(2, 94, 255, .1)`
    dateIcon.style.backgroundColor = '#fff'
    dateIcon.classList.add('date-on')
})
dateLabel.addEventListener('mouseleave', () => {
    dateWrap.style.backgroundColor = 'transparent'
    dateIcon.style.backgroundColor = `rgba(2, 94, 255, .1)`
    dateIcon.classList.remove('date-on')
})