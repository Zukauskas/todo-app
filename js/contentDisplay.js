import { getSortedList } from "./getSortedList.js";
import { calculateDeadline } from "./calculateDeadline.js";

const selectDOM = document.querySelector("#sorting");

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

function contentDisplay() {
  const taskList = getSortedList();
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

export { contentDisplay };
