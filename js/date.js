

const dateInput = document.getElementById('datePicker')
const dateTimeInput = document.getElementById('dateTimePicker')

flatpickr(dateInput, {
    dateFormat: "M d",
    disableMobile: "true",
    mode: "range",
});

flatpickr(dateTimeInput, {
    enableTime: true,
    dateFormat : "M d H:i",
    disableMobile: "true",
    "plugins": [new confirmDatePlugin({
        confirmText: "OK ",
        showAlways: false,
        theme: "light"
    })]
})


const dateWrap = document.querySelectorAll(".date dl")
const dateLabel = document.querySelectorAll(".date dl dd label")

dateLabel.forEach((label,index) => {
    label.addEventListener('mouseenter', () => {
        dateWrap.forEach((date) => {
            date.classList.remove('date-on')
        })
        dateWrap[index].classList.add('date-on')
    })

    label.addEventListener('mouseleave', () => {
        dateWrap[index].classList.remove('date-on')
    })
})