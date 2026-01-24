import { useDifficultyValues } from "@/helpers/utils";
import type { DifficultBadgeProps } from "./DifficultBadge.types";

import "../styles/badge.css";

const DifficultBadge = ({ difficulty, className }: DifficultBadgeProps) => {
  const difficultValues = useDifficultyValues();

  return <span className={`${className ? className : ""} difficultBadge`}>{ difficulty } { difficultValues[difficulty - 1] }</span>
}

export default DifficultBadge;