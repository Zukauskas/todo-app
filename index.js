let defaultTasks = [
  {
    taskDescription: "Complete ToDo App",
    taskDeadline: "2023-07-24T19:32",
    isCompleted: false,
    dateAdded: 1689954765691,
    dateCompleted: null,
  },
  {
    taskDescription: "Walk the dog",
    taskDeadline: "2023-07-21T16:02",
    isCompleted: false,
    dateAdded: 1689954745691,
    dateCompleted: null,
  },
  {
    taskDescription: "Go Shopping",
    taskDeadline: "2023-07-21T16:02",
    isCompleted: false,
    dateAdded: 1689954725691,
    dateCompleted: null,
  },
  {
    taskDescription: "Go to Gym",
    taskDeadline: "2023-07-21T16:02",
    isCompleted: true,
    dateAdded: 1689954705691,
    dateCompleted: 1689954765691,
  },
];

let taskList = [];
const getTasks = sessionStorage.getItem("tasks");
if (!getTasks) {
  sessionStorage.setItem("tasks", JSON.stringify(defaultTasks));
  sessionStorage.setItem("sort", "recently-added");
}

const modalDOM = document.querySelector("#modal-container");
const formDOM = document.querySelector("#new-task-form");

const newTaskBtnList = document.querySelectorAll(".new-task");
const submitBtnDOM = document.querySelector("form > input[type='submit']");
const selectDOM = document.querySelector("#sorting");

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

selectDOM.addEventListener("change", (e) => {
  sessionStorage.setItem("sort", e.target.value);
  contentDisplay();
});

function deleteTask(list, number) {
  let text = "Press Ok to delete.\nOr Cancel to abort.";
  if (confirm(text)) {
    list.splice(number, 1);
    sessionStorage.setItem("tasks", JSON.stringify(list));
    contentDisplay();
  }
}

function changeTaskStatus(list, number) {
  list[number].dateCompleted = Date.now();
  list[number].isCompleted = !list[number].isCompleted;
  sessionStorage.setItem("tasks", JSON.stringify(list));
  contentDisplay();
}

function calculateDeadline(deadline) {
  if (!deadline) {
    return "N\\A";
  }
  const deadlineSet = new Date(deadline).getTime();
  const timeNow = new Date().getTime();
  const minutes = Math.trunc((deadlineSet - timeNow) / 1000 / 60) % 60;
  const hours = Math.trunc((deadlineSet - timeNow) / 1000 / 60 / 60) % 60;
  const days = Math.trunc((deadlineSet - timeNow) / 1000 / 60 / 60 / 24) % 24;
  return `Time left: ${days >= 0 ? days : 0} days ${
    hours >= 0 ? hours : 0
  } hours ${minutes >= 0 ? minutes : 0} minutes`;
}

function getSortedList() {
  const sortingType = sessionStorage.getItem("sort");
  const list = JSON.parse(sessionStorage.getItem("tasks"));
  if (sortingType == "recently-added") {
    list.sort((a, b) => {
      if (a.dateAdded > b.dateAdded) return -1;
      if (a.dateAdded < b.dateAdded) return 1;
    });
  }
  if (sortingType == "recently-completed") {
    list.sort((a, b) => {
      if (a.dateCompleted > b.dateCompleted) return -1;
      if (a.dateCompleted < b.dateCompleted) return 1;
    });
  }
  if (sortingType == "deadline") {
    list.sort((a, b) => {
      if (a.taskDeadline > b.taskDeadline) return 1;
      if (a.taskDeadline < b.taskDeadline) return -1;
    });
  }
  return list;
}

function addNewTask(e) {
  e.preventDefault();
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

function contentDisplay() {
  taskList = getSortedList();
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
    taskDeadline.textContent = calculateDeadline(taskList[i].taskDeadline);
    taskCompletion.checked = taskList[i].isCompleted;
    deleteButton.textContent = "Delete";
    taskCard.dataset.indexNumber = i;

    if (taskCompletion.checked) {
      taskCard.classList.add("completed");
    }

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
