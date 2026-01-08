import * as React from "react";
import StepIndicator from "./StepIndicator";
import { useTranslation } from "react-i18next";

type StepProcessProps = {
  steps: Array<React.JSX.Element>,
  stepDescriptions: Array<string>
}

const StepProcess = ({ steps, stepDescriptions }: StepProcessProps) => {
  const { t } = useTranslation(["routeCreation"]);
  const [ step, setStep ] = React.useState(0);
  const [ isFinished, setIsFinisehd ] = React.useState(steps.length === step);
  const onEndedStep = () => {
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

  return <div className="text-center">
    { isFinished ? t("main.process is finished") : <>
      <h2 className="inline font-bold text-2xl">{ `${t("main.step")} ${step + 1}` }</h2>
      { t(stepDescriptions[step]) }
      { steps[step] }
    </>}
    { !isFinished && step > 0 ? <button className="button-primary w-auto h-10" onClick={ onPreviousStep }>{ t("main.previous") }</button> : <></>}
    { !isFinished && step < steps.length ? <button className="button-primary w-auto h-10" onClick={ onEndedStep }>{ t("main.next") }</button> : <></>}
    { !isFinished ? <StepIndicator stepsNumber={ steps.length } currentStep={ step } /> : <></>}
  </div>;
}

export default StepProcess;