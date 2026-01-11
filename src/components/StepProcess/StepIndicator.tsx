type StepIndicatorProps = {
  currentStep: number,
  stepsNumber: number
}

const StepIndicator = ({ currentStep, stepsNumber }: StepIndicatorProps) => {
  const pointIndicator = [];

  for(let step = 0; step < stepsNumber; step++) {
    pointIndicator.push(<span key={ step } className={ step === currentStep ? "text-primary" : "text-terciary"}>✸</span>)
  }

  return (<div>
    { pointIndicator }
  </div>);
}

export default StepIndicator;