function getSortedList() {
  const sortingType = sessionStorage.getItem("sort");
  const list = JSON.parse(sessionStorage.getItem("tasks"));
  if (sortingType === "recently-added") {
    list.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return b.dateAdded > a.dateAdded ? 1 : -1;
    });
  }

  if (sortingType === "recently-completed") {
    list.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? -1 : 1;
      }
      return a.dateCompleted < b.dateCompleted ? 1 : -1;
    });
  }

  if (sortingType === "deadline") {
    list.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return a.taskDeadline > b.taskDeadline ? 1 : -1;
    });
  }
  return list;
}

export { getSortedList };
