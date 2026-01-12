import * as React from "react";
import StepIndicator from "./StepIndicator";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

type StepProcessProps = {
  steps: Array<React.JSX.Element>,
  stepDescriptions: Array<string>,
  stepTitles: Array<string>,
  stepsSelectors: Array<(state: unknown, ...params: unknown[]) => unknown>
}

const StepProcess = ({ steps, stepDescriptions, stepTitles, stepsSelectors }: StepProcessProps) => {
  const { t } = useTranslation(["routeCreation"]);
  const [ step, setStep ] = React.useState(0);
  const isCurrentStepFinished = useSelector(stepsSelectors[step]);

  const onNextStep = () => {
    if (step + 1 < steps.length) {
      setStep((prev) => prev + 1);
    }
  }

  const onPreviousStep = () => {
    if (step - 1 >= 0) {
      setStep((prev) => prev - 1);
    }
  }

  return <div className="text-center card p-0 sm:p-5 max-w-6xl m-auto">
    <>
      <h2 className="font-bold text-2xl mt-10">{ `${t("main.step")} ${step + 1}: ${stepTitles[step]}` }</h2>
      <div className="p-5 sm:p-0">{ t(stepDescriptions[step]) }</div>
        { steps[step] }
    </>
    { step > 0 ? <button className="mt-5 mr-2 inline button-primary w-auto h-10 m-auto" 
        onClick={ onPreviousStep }>{ t("main.previous") }</button> : <></>}
    { step < steps.length - 1 ? <button className="mt-5 ml-2 inline button-primary w-auto h-10 m-auto"
        onClick={ onNextStep } disabled={ !isCurrentStepFinished }>{ t("main.next") }</button> : <></>}
    { <StepIndicator stepsNumber={ steps.length } currentStep={ step } />}
  </div>;
}

export default StepProcess;