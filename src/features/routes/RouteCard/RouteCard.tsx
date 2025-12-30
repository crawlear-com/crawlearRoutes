import MapPointPicker from "../../maps/MapPointPicker";
import type { RouteCardProps } from "./RouteCard.types";
import markerImage from '../../maps/MapPointPicker/assets/images/marker-icon.png';

const RouteCard = ({ route }: RouteCardProps) => {
  return <div className="grid rounded-2xl shadow-2xl mb-10 p-5 content-end text-left cursor-pointer"> 
    <h2 className="row-start-1 row-end-2 col-start-1 col-end-3 text-2xl">{ route.name } </h2>
    <div className="row-start-2 row-end-3 col-start-1 col-end-2  max-h-5"><img src={markerImage} className="w-3 h-3 inline mr-1" />{ route.distance }km</div>
    <div className="row-start-2 row-end-3 col-start-2 col-end-3  max-h-5">{ route.durationTime }mins</div>
    <div className="row-start-3 row-end-4 col-start-2 col-end-3  max-h-5">
      <span className="bg-primary text-white rounded-xl p-2  max-h-5">{ route.difficulty } moderate</span>
    </div>
    <div className="row-start-3 row-end-4 col-start-1 col-end-2  max-h-5">{ route.likes } Likes</div>    
    
    <MapPointPicker className="justify-self-end row-start-1 row-end-4 col-start-3 col-end-4" 
      width={13} height={7} point={ route.location } id = { route.id } />
  </div>;
}

export default RouteCard;