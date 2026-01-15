type StepIndicatorProps = {
  currentStep: number,
  stepsNumber: number
}

const StepIndicator = ({ currentStep, stepsNumber }: StepIndicatorProps) => {
  const pointIndicator = [];

  for(let step = 0; step < stepsNumber; step++) {
    const className = step === currentStep ? "text-primary" : "text-terciary";
    pointIndicator.push(<span key={ step } className={ className}>✸</span>)
  }

  return (<div className="mt-10">
    { pointIndicator }
  </div>);
}

export default StepIndicator;