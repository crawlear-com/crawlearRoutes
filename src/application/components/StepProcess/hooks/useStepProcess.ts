import type { RootState } from "@/application/store/store";
import * as React from "react";
import { useSelector } from "react-redux";

const useStepProcess = (steps: Array<React.JSX.Element>, stepsSelectors: Array<(state: RootState, ...params: unknown[]) => unknown>): [
    number, boolean, () => void, () => void
  ] => {
  const [ step, setStep ] = React.useState(0);
  const isCurrentStepFinished = useSelector(stepsSelectors[step]) as boolean;

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

  return [ step, isCurrentStepFinished, onNextStep, onPreviousStep ];
}

export default useStepProcess;