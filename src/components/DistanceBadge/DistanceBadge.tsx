import type { DistanceBadgeProps } from "./DistanceBadge.types";

import "../../styles/route.css";
import kmMarker from '../../features/routes/RouteCard/assets/images/marker-icon.png';

const DistanceBadge = ({ distance, className }: DistanceBadgeProps) => {
  return <span className={`${className ? className : ""}`}>
    <img className="w-3 h-auto inline mr-1" src={ kmMarker } />{ distance } km</span>
}

export default DistanceBadge;