import type { DurationBadgeProps } from "./DistanceBadge.types";

const DurationBadge = ({ duration, className }: DurationBadgeProps) => {
  return <span className={`${className ? className : ""}`}>
    🕐 { duration }
    </span>
}

export default DurationBadge;