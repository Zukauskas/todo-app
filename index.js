import { defaultTasks } from "./data/defaultTasks.js";
import { addNewTask } from "./js/addNewTask.js";
import { contentDisplay } from "./js/contentDisplay.js";

// check if first time loading
const getTasks = sessionStorage.getItem("tasks");
if (!getTasks) {
  sessionStorage.setItem("tasks", JSON.stringify(defaultTasks));
  sessionStorage.setItem("sort", "recently-added");
}

contentDisplay();
addNewTask;
