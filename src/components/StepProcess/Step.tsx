import * as React from "react";
import { useSelector } from "react-redux";

type StepProps = {
  onFinishedCondition: () => void,
  conditionSelector: (state: unknown, ...params: unknown[]) => unknown,
  children: React.JSX.Element
}

const Step = ({ children, onFinishedCondition, conditionSelector}: StepProps) => {
  const isStepFinished = useSelector(conditionSelector);

  React.useEffect(() => {
    if (isStepFinished) {
      onFinishedCondition();
    }
  }, [isStepFinished, onFinishedCondition]);

  return <>{ children }</>;
}

export default Step;