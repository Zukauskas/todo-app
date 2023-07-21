const taskList = [];

const modalDOM = document.querySelector('#modal-container');
const formDOM = document.querySelector('#new-task-form');

const newTaskBtnList = document.querySelectorAll(".new-task");

for (const button of newTaskBtnList){
    button.addEventListener('click', () => {
        modalDOM.classList.replace('hidden', 'visible')
})
}

