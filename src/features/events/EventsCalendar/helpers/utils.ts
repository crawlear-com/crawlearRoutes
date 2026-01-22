const datePlusHours = (date: string, hours: number) => {
  const origDate = new Date(date);
  
  origDate.setHours(origDate.getHours() + hours);

  return origDate;
}

const getDate15DaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 15);

  return date.toISOString();
}

const getDate15DaysFrom = () => {
  const date = new Date();
  date.setDate(date.getDate() + 15);

  return date.toISOString();
}

export { datePlusHours, getDate15DaysAgo, getDate15DaysFrom };