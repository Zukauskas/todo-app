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

export { getSortedList };
