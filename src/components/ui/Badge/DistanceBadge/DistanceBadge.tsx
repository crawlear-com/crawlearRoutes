import type { DistanceBadgeProps } from "./DistanceBadge.types";

import kmMarker from '../assets/images/marker-icon.png';
import { toKm } from "@/helpers/utils";

const DistanceBadge = ({ distance, className }: DistanceBadgeProps) => {
  return <span className={`${className ? className : ""}`}>
    <img alt="distance badge icon" className="w-3 h-auto inline mr-1" src={ kmMarker } />{ toKm(distance) } km</span>
}

export default DistanceBadge;