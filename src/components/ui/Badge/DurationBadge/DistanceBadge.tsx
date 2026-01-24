import { toHours } from "@/helpers/utils";
import type { DurationBadgeProps } from "./DistanceBadge.types";

const DurationBadge = ({ duration, className }: DurationBadgeProps) => {
  return <span className={`${className ? className : ""}`}>
    🕐 { toHours(duration) } h
    </span>
}

export default DurationBadge;