const projectList = document.querySelectorAll('#project-lists dl') // 프로젝트 메뉴 탭 <dl>
const projectContents = document.querySelectorAll('main section') // 프로젝트 컨텐츠

// projectContents[0].classList.add('section-on')
// projectList[0].classList.add('project-on')

projectList.forEach((project, index) => {
    project.addEventListener('click', (event) => {
        projectList.forEach((item) => {
            item.classList.remove('project-on')
        })
        project.classList.add('project-on')
        projectContents.forEach((contents) => {
            contents.classList.remove('section-on')
        })
        projectContents[index].classList.add('section-on')
    })
})