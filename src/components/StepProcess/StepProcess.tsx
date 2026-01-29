import StepIndicator from "./StepIndicator";
import { useTranslation } from "react-i18next";

import './styles/stepProcess.css';
import { NEXT_PAGE_ARROW, PREVIOUS_PAGE_ARROW, type StepProcessProps } from "./StepProcess.types";
import useStepProcess from "./hooks/useStepProcess";

const StepProcess = ({ steps, stepDescriptions, stepTitles, stepsSelectors }: StepProcessProps) => {
  const { t } = useTranslation(["routeCreation"]);
  const [ step, isCurrentStepFinished, onNextStep, onPreviousStep] = useStepProcess(steps, stepsSelectors);
  return <div className="text-center card p-0 sm:p-5 m-auto">
    <>
      <h2 className="font-bold text-2xl mt-3 mb-5">{ `${t("main.step")} ${step + 1}: ${t(stepTitles[step])}` }</h2>
      <p className="text-left max-w-[90%] mx-auto p-5 sm:p-0 mb-10">{ t(stepDescriptions[step]) }</p>
      { <StepIndicator stepsNumber={ steps.length } currentStep={ step } />}
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