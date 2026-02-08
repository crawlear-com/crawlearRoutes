import type { LikesBadgeProps } from "./LikesBadge.types";

const LikesBadge = ({ likes, className }: LikesBadgeProps) => {
  return <div className={ `w-auto ${className} ? ${className} : ""` }>
    ♥️ { likes }
  </div>;
}

export default LikesBadge;