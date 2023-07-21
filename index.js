let defaultTasks = [
  {
    taskDescription: "Complete ToDo App",
    taskDeadline: "2023-07-21T16:02",
    taskProgress: "inProgress",
  },
  {
    taskDescription: "Walk the dog",
    taskDeadline: "2023-07-21T16:02",
    taskProgress: "inProgress",
  },
  {
    taskDescription: "Go Shopping",
    taskDeadline: "2023-07-21T16:02",
    taskProgress: "inProgress",
  },
  {
    taskDescription: "Go to Gym",
    taskDeadline: "2023-07-21T16:02",
    taskProgress: "Completed",
  },
];

let taskList = [];
const getTasks = sessionStorage.getItem("tasks");
if (!getTasks) {
  sessionStorage.setItem("tasks", JSON.stringify(defaultTasks));
}

const modalDOM = document.querySelector("#modal-container");
const formDOM = document.querySelector("#new-task-form");

const newTaskBtnList = document.querySelectorAll(".new-task");

// Event listeners
for (const btn of newTaskBtnList) {
  btn.addEventListener("click", () => {
    if (modalDOM.classList.contains("hidden")) {
      modalDOM.classList.replace("hidden", "visible");
    } else {
      modalDOM.classList.replace("visible", "hidden");
    }
  });
}

const submitBtnDOM = document.querySelector("form > input[type='submit']");

submitBtnDOM.addEventListener("click", (e) => {
  addNewTask(e);
});

function addNewTask(e) {
  e.preventDefault();
  const taskDescription = document.querySelector("#description").value;
  const taskDeadline = document.querySelector("#deadline").value || Date.now();
  const taskProgress = "inProgress";
  let newTask = {};
  if (taskDescription) {
    newTask = { taskDescription, taskDeadline, taskProgress };
    taskList.push(newTask);
    sessionStorage.setItem("tasks", JSON.stringify(taskList));
    formDOM.reset();
    modalDOM.classList.replace("visible", "hidden");
    contentDisplay();
  } else {
    alert("Fill all required fields");
  }
}

function contentDisplay() {
  taskList = JSON.parse(sessionStorage.getItem("tasks"));
  const tasksDOM = document.querySelector("#task-list");

  tasksDOM.innerHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    const taskCard = document.createElement("div");
    const taskDescription = document.createElement("h3");
    const taskDeadline = document.createElement("p");
    const taskCompletion = document.createElement("input");
    const deleteButton = document.createElement("button");

    taskCompletion.setAttribute("type", "checkbox");
    taskDescription.textContent = taskList[i].taskDescription;
    taskDeadline.textContent = taskList[i].taskDeadline;
    taskCompletion.checked =
      taskList[i].taskProgress == "inProgress" ? false : true;
    deleteButton.textContent = "Delete";

    taskCard.classList.add("task-card");
    taskCard.appendChild(taskCompletion);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskDeadline);
    taskCard.appendChild(deleteButton);

    taskCard.dataset.indexNumber = i;
    tasksDOM.appendChild(taskCard);
  }
}

contentDisplay();
