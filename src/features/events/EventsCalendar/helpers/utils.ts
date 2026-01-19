const datePlusHours = (date: string, hours: number) => {
  const origDate = new Date(date);
  
  origDate.setHours(origDate.getHours() + hours);

  return origDate;
}

export { datePlusHours}