import * as React from "react";
import StepIndicator from "./StepIndicator";
import { useTranslation } from "react-i18next";
import Step from "./Step";
import { useSelector } from "react-redux";

type StepProcessProps = {
  steps: Array<React.JSX.Element>,
  stepDescriptions: Array<string>,
  stepsSelectors: Array<(state: unknown, ...params: unknown[]) => unknown>
}

const StepProcess = ({ steps, stepDescriptions, stepsSelectors }: StepProcessProps) => {
  const { t } = useTranslation(["routeCreation"]);
  const [ step, setStep ] = React.useState(0);
  const [ isFinished, setIsFinisehd ] = React.useState(steps.length === step);
  const isCurrentStepFinished = useSelector(stepsSelectors[step]);

  const onNextStep = () => {
    if (step + 1 < steps.length) {
      setStep((prev) => prev + 1);
    } else {
      setIsFinisehd(true);
    }
  }

  const onPreviousStep = () => {
    if (step - 1 >= 0) {
      setStep((prev) => prev - 1);
    }
  }

  const onFinishedCondition = () => {
    //console.log("Finished step1!")
  }

  return <div className="text-center">
    { isFinished ? t("main.process is finished") : <>
      <h2 className="font-bold text-2xl mt-10">{ `${t("main.step")} ${step + 1}` }</h2>
      { t(stepDescriptions[step]) }
      <Step onFinishedCondition={ onFinishedCondition } conditionSelector={ stepsSelectors[step] }>
        { steps[step] }
      </Step>
    </> }
    { !isFinished && step > 0 ? <button className="mt-5 mr-2 inline button-primary w-auto h-10 m-auto" 
        onClick={ onPreviousStep }>{ t("main.previous") }</button> : <></>}
    { !isFinished && step < steps.length ? <button className="mt-5 ml-2 inline button-primary w-auto h-10 m-auto"
        onClick={ onNextStep } disabled={ !isCurrentStepFinished }>{ t("main.next") }</button> : <></>}
    { !isFinished ? <StepIndicator stepsNumber={ steps.length } currentStep={ step } /> : <></>}
  </div>;
}

export default StepProcess;