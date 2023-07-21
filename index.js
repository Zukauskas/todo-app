let defaultTasks = [
  {
    taskDescription: "Complete ToDo App",
    taskDeadline: "2023-07-21T16:02",
    isCompleted: false,
  },
  {
    taskDescription: "Walk the dog",
    taskDeadline: "2023-07-21T16:02",
    isCompleted: false,
  },
  {
    taskDescription: "Go Shopping",
    taskDeadline: "2023-07-21T16:02",
    isCompleted: false,
  },
  {
    taskDescription: "Go to Gym",
    taskDeadline: "2023-07-21T16:02",
    isCompleted: true,
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
const submitBtnDOM = document.querySelector("form > input[type='submit']");

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

submitBtnDOM.addEventListener("click", (e) => {
  addNewTask(e);
});

function deleteTask(list, number) {
  list.splice(number, 1);
  sessionStorage.setItem("tasks", JSON.stringify(list));
  contentDisplay();
}

function changeTaskStatus(list, number) {
  list[number].isCompleted = !list[number].isCompleted;
  sessionStorage.setItem("tasks", JSON.stringify(list));
  contentDisplay();
}

function addNewTask(e) {
  e.preventDefault();
  const taskDescription = document.querySelector("#description").value;
  const taskDeadline =
    document.querySelector("#deadline").value || new Date().toJSON();
  const isCompleted = false;
  let newTask = {};
  if (taskDescription) {
    newTask = { taskDescription, taskDeadline, isCompleted };
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
    taskCompletion.checked = taskList[i].isCompleted;
    deleteButton.textContent = "Delete";

    if (taskCompletion.checked) {
      taskCard.classList.add("completed");
    }
    taskCard.dataset.indexNumber = i;

    deleteButton.addEventListener("click", (e) => {
      const taskNumber =
        +e.target.parentElement.attributes["data-index-number"].value;
      deleteTask(taskList, taskNumber);
    });

    taskCompletion.addEventListener("click", (e) => {
      const taskNumber =
        +e.target.parentElement.attributes["data-index-number"].value;
      changeTaskStatus(taskList, taskNumber);
    });

    taskCard.classList.add("task-card");
    taskCard.appendChild(taskCompletion);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskDeadline);
    taskCard.appendChild(deleteButton);

    tasksDOM.appendChild(taskCard);
  }
}

contentDisplay();
