function calculateDeadline(deadline) {
  if (!deadline) {
    return "N\\A";
  }
  const deadlineSet = new Date(deadline).getTime();
  const timeNow = new Date().getTime();
  const minutes = Math.trunc((deadlineSet - timeNow) / 1000 / 60) % 60;
  const hours = Math.trunc((deadlineSet - timeNow) / 1000 / 60 / 60) % 24;
  const days = Math.trunc((deadlineSet - timeNow) / 1000 / 60 / 60 / 24);
  return `Time left: ${days >= 0 ? days : 0} days ${
    hours >= 0 ? hours : 0
  } hours ${minutes >= 0 ? minutes : 0} minutes`;
}

export { calculateDeadline };
