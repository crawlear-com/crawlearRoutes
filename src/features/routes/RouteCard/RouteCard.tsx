import SimpleMap from "../../maps/SimpleMap/SimpleMap";
import type { RouteCardProps } from "./RouteCard.types";
import markerImage from '../../maps/SimpleMap/assets/images/marker-icon.png';
import { v4 as uuidv4 } from 'uuid';

const RouteCard = ({ route }: RouteCardProps) => {
  return <div className="card grid"> 
    <h2 className="row-start-1 row-end-2 col-start-1 col-end-3 text-2xl">{ route.name } </h2>
    <div className="row-start-2 row-end-3 col-start-1 col-end-2  max-h-5"><img src={markerImage} className="w-3 h-3 inline mr-1" />{ route.distance }km</div>
    <div className="row-start-2 row-end-3 col-start-2 col-end-3  max-h-5">{ route.durationTime }mins</div>
    <div className="row-start-3 row-end-4 col-start-2 col-end-3  max-h-5">
      <span className="bg-primary text-white rounded-xl px-1  max-h-5">{ route.difficulty } moderate</span>
    </div>
    <div className="row-start-3 row-end-4 col-start-1 col-end-2  max-h-5">{ route.likes } Likes</div>    
    
    <SimpleMap className="justify-self-end row-start-1 row-end-4 col-start-3 col-end-4" 
      width="w-40" height="h-20" point={ route.location } id = {`${uuidv4()}` } />
  </div>;
}

export default RouteCard;