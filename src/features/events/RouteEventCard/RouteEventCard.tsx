import { useNavigate } from "react-router";
import type { RouteEventCardProps } from "./RouteEventCard.types";
import ScaleBadge from "../../../components/Badge/ScaleBadge/ScaleBadge";

const RouteEventCard = ({ routeEvent, extras }: RouteEventCardProps) => {
  const navigate = useNavigate();

  return <div className="routeCard card cursor-pointer grid relative pt-10" onClick={ () => { navigate(`/showroute/${routeEvent.id}`)}}> 
    <h2 className="row-start-1 row-end-2 col-start-1 col-end-3 sm:text-2xl">{ routeEvent.name }</h2>
    <p>{ routeEvent.description }</p>
    <div className="row-start-2 row-end-3 col-start-1 col-end-2 text-xs sm:text-base max-h-5">
      <ScaleBadge scale={ routeEvent.scale } />
    </div>
    { extras }
  </div>;
}

export default RouteEventCard;