export function getDataFromLS() {
  const data = localStorage.getItem("person-data");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

export const getAgeFromDOB = (dob) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  const [bYear, bMonth, bDate] = dob.split("-");

  if (+bMonth < currentMonth) {
    return currentYear - +bYear;
  } else if (+bMonth > currentMonth) {
    return currentYear - +bYear - 1;
  } else {
    if (+bDate < currentDate) {
      return currentYear - +bYear;
    } else if (+bDate > currentDate) {
      return currentYear - +bYear - 1;
    } else {
      return currentYear - +bYear;
    }
  }
};
