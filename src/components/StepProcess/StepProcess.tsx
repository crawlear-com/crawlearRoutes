import * as React from "react";
import StepIndicator from "./StepIndicator";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import './styles/stepProcess.css';
import { NEXT_PAGE_ARROW, PREVIOUS_PAGE_ARROW, type StepProcessProps } from "./StepProcess.types";

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

  return <div className="text-center card p-0 sm:p-5 max-w-6xl m-auto relative">
    <>
      <h2 className="font-bold text-2xl mt-3">{ `${t("main.step")} ${step + 1}: ${stepTitles[step]}` }</h2>
      <div className="p-5 sm:p-0">{ t(stepDescriptions[step]) }</div>
        { steps[step] }
    </>
    { step > 0 ? <button className="stepButton left-2 disabled:opacity-50"
        onClick={ onPreviousStep }>{ PREVIOUS_PAGE_ARROW }</button> : <></>}
    { step < steps.length - 1 ? <button className="stepButton right-2 disabled:opacity-50"
        onClick={ onNextStep } disabled={ !isCurrentStepFinished }>{ NEXT_PAGE_ARROW }</button> : <></>}
    { <StepIndicator stepsNumber={ steps.length } currentStep={ step } />}
  </div>;
}

export default StepProcess;