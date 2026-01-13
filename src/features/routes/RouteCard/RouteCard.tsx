import { useNavigate } from "react-router";
import SimpleMap from "../../maps/SimpleMap/SimpleMap";
import type { RouteCardProps } from "./RouteCard.types";
import { v4 as uuidv4 } from 'uuid';
import DifficultBadge from "../../../components/DifficultBadge/DifficultBadge";
import DistanceBadge from "../../../components/DistanceBadge/DistanceBadge";

import "../../../styles/route.css";
import LikesBadge from "../../../components/LikesBadge/LikesBadge";

const RouteCard = ({ route, extras }: RouteCardProps) => {
  const navigate = useNavigate();

  return <div className="card grid" onClick={ () => { navigate(`/route/${route.id}`)}}> 
    <h2 className="row-start-1 row-end-2 col-start-1 col-end-3 sm:text-2xl">{ route.name } </h2>
    <div className="row-start-2 row-end-3 col-start-1 col-end-2 text-xs sm:text-base max-h-5">
      <DistanceBadge distance={ route.distance } />
    </div>
    <div className="row-start-2 row-end-3 col-start-2 col-end-3 text-xs sm:text-base max-h-5">{ route.durationTime }mins</div>
    <div className="row-start-3 row-end-4 col-start-2 col-end-3 text-xs sm:text-base max-h-5">
      <DifficultBadge difficulty={ route.difficulty } />
    </div>
    <div className="row-start-3 row-end-4 col-start-1 col-end-2 text-xs sm:text-base max-h-5">
      <LikesBadge likes={ route.likes } />  
    </div>    
    
    <SimpleMap className="justify-self-end row-start-1 row-end-4 col-start-3 col-end-4 z-10" 
      width="w-36" height="h-30" point = { route.location || { lat: 0, lon: 0} } id = {`${uuidv4()}` } />
    { extras }
  </div>;
}

export default RouteCard;