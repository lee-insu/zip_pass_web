const dateFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();

  const timeFormat = hours > 12 ? "오후" : "오전";
  const displayHours = hours % 12 || 12;

  return {
    year,
    month,
    day,
    timeFormat,
    hours: displayHours,
  };
};

export default dateFormatter;
