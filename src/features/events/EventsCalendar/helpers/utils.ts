const datePlus1h = (date: string) => {
  const origDate = new Date(date);
  
  origDate.setHours(origDate.getHours()+1);

  return origDate;
}

export { datePlus1h}