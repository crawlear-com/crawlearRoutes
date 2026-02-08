const generateHoursOptions = () => {
  const options = [];

  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0') + ':00h';
    const halfString = hour.toString().padStart(2, '0') + ':30h';
    options.push(<option key={ hourString } value={ hourString }>{ hourString }</option>);
    options.push(<option key={ halfString } value={ halfString }>{ halfString }</option>);
  }

  return options;
}

export { generateHoursOptions };