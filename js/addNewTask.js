import { getSortedList } from "./getSortedList.js";
import { contentDisplay } from "./contentDisplay.js";

const modalDOM = document.querySelector("#modal-container");
const newTaskBtnList = document.querySelectorAll(".new-task");
const submitBtnDOM = document.querySelector("form > input[type='submit']");
const formDOM = document.querySelector("#new-task-form");

for (const btn of newTaskBtnList) {
  btn.addEventListener("click", () => {
    if (modalDOM.classList.contains("hidden")) {
      modalDOM.classList.replace("hidden", "visible");
    } else {
      modalDOM.classList.replace("visible", "hidden");
    }
  });
}

submitBtnDOM.addEventListener("click", (e) => {
  addNewTask(e);
});

function addNewTask(e) {
  e.preventDefault();
  const taskList = getSortedList();
  const taskDescription = document.querySelector("#description").value;
  const taskDeadline = document.querySelector("#deadline").value;
  const isCompleted = false;
  const dateCompleted = null;
  const dateAdded = Date.now();
  let newTask = {};
  if (taskDescription) {
    newTask = {
      taskDescription,
      taskDeadline,
      isCompleted,
      dateAdded,
      dateCompleted,
    };
    taskList.push(newTask);
    sessionStorage.setItem("tasks", JSON.stringify(taskList));
    formDOM.reset();
    modalDOM.classList.replace("visible", "hidden");
    contentDisplay();
  } else {
    alert("Fill all required fields");
  }
}

export { addNewTask };
