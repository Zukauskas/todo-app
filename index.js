const taskList = [];

const modalDOM = document.querySelector('#modal-container');
const formDOM = document.querySelector('#new-task-form');

const newTaskBtnList = document.querySelectorAll(".new-task");

// Event listeners
for (const btn of newTaskBtnList){
    btn.addEventListener('click', () => {
        if (modalDOM.classList.contains('hidden')){
            modalDOM.classList.replace('hidden', 'visible')
        } else {
            modalDOM.classList.replace('visible', 'hidden')
        }
})
}

const submitBtnDOM = document.querySelector("form > input[type='submit']")

submitBtnDOM.addEventListener('click', e => {
        addNewTask(e)
})


function addNewTask(e) {
    e.preventDefault();
    const taskDescription = document.querySelector('#description').value;
    const taskDeadline = document.querySelector('#deadline').value || Date.now();
    let newTask = {};
    if(taskDescription){
        newTask = {taskDescription, taskDeadline};
    }
    taskList.push(newTask);
    console.log(taskList);
    formDOM.reset();
    modalDOM.classList.replace('visible', 'hidden');
}

