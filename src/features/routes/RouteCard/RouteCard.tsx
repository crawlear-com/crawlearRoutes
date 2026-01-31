import { useNavigate } from "react-router";
import SimpleMap from "@/features/maps/SimpleMap/SimpleMap";
import type { RouteCardProps } from "./RouteCard.types";
import { v4 as uuidv4 } from 'uuid';
import DifficultBadge from "@/components/ui/Badge/DifficultBadge/DifficultBadge";
import DistanceBadge from "@/components/ui/Badge/DistanceBadge/DistanceBadge";

import LikesBadge from "@/components/ui/Badge/LikesBadge/LikesBadge";
import DurationBadge from "@/components/ui/Badge/DurationBadge/DistanceBadge";

const RouteCard = ({ route, extras }: RouteCardProps) => {
  const navigate = useNavigate();

  return <div className=" grid-cols-3 routeCard bg-background cursor-pointer p-5 border-t border-primary mb-8 grid relative pt-10"
    onClick={ () => { navigate(`/showroute/${route.id}`)}}> 
    <h2 className="row-start-2 row-end-3 col-start-1 col-end-4 sm:text-2xl text-ellipsis">{ route.name } </h2>
    <div className="row-start-3 row-end-4 col-start-1 col-end-2 text-xs sm:text-base max-h-5">
      <DistanceBadge className="text-rigtht" distance={ route.distance } />
    </div>
    <div className="row-start-3 row-end-4 col-start-2 col-end-3 text-xs sm:text-base max-h-5">
      <DurationBadge duration={ route.durationTime } />
    </div>
    <div className="row-start-3 row-end-4 col-start-3 col-end-4 text-xs sm:text-base max-h-5">
      <DifficultBadge difficulty={ route.difficulty } />
    </div>
    <div className="row-start-4 row-end-5 col-start-1 col-end-2 text-xs sm:text-base max-h-5">
      <LikesBadge likes={ route.likes } />  
    </div>
    
    <SimpleMap containerClassName="w-full justify-self-end row-start-1 row-end-2 col-start-1 col-end-4 z-10 mt-2" 
      className="-z-50" width="w-full" height="h-20"
      zoomScale={ 0.01 }
      point={ route.location || { lat: 0, lon: 0} } id={`${uuidv4()}` } />
    { extras }
  </div>;
}

export default RouteCard;