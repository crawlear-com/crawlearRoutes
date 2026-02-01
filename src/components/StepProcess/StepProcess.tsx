import StepIndicator from "./StepIndicator";
import { useTranslation } from "react-i18next";

import './styles/stepProcess.css';
import { type StepProcessProps } from "./StepProcess.types";
import useStepProcess from "./hooks/useStepProcess";

const StepProcess = ({ steps, stepDescriptions, stepTitles, stepsSelectors }: StepProcessProps) => {
  const { t } = useTranslation(["routeCreation"]);
  const [ step, isCurrentStepFinished, onNextStep, onPreviousStep] = useStepProcess(steps, stepsSelectors);
  return <div className="md:max-w-[90%] m-auto text-center card p-0 sm:p-5 z-10 relative">
    <div className="">
      <h2 className="font-bold text-2xl mt-3 mb-5">{ `${t("main.step")} ${step + 1}/${steps.length}` }</h2>
      <StepIndicator stepsNumber={ steps.length } currentStep={ step } />
      <p className="text-center max-w-[90%] mx-auto p-5 sm:p-0 mb-10"><strong>{ t(stepTitles[step]) }</strong> { t(stepDescriptions[step]) }</p>
      { steps[step] }
    </div>
    { step > 0 ? <button className="stepButton left-2"
        onClick={ onPreviousStep }>{ t("main.previous") }</button> : <></>}
    
    { step < steps.length - 1 ? <button className="stepButton next right-2"
        onClick={ onNextStep } disabled={ !isCurrentStepFinished }>{ t("main.next") }</button> : <></>}
    { <StepIndicator stepsNumber={ steps.length } currentStep={ step } />}
  </div>;
}

export default StepProcess;