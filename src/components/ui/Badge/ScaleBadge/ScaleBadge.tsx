import { getScaleValue } from "@/helpers/utils";
import type { ScaleBadgeProps } from "./ScaleBadge.types";

import carImg from '../assets/images/scaleCar.png'

const ScaleBadge = ({ scale, className }: ScaleBadgeProps) => {
  return <span className={`${className ? className : ""}`}>
    <img className="w-10 inline" src={carImg} alt="car icon" />{ getScaleValue(scale) }
  </span>
  }

export default ScaleBadge;