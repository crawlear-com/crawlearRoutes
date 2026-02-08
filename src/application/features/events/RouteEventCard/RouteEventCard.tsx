import { useNavigate } from "react-router";
import type { RouteEventCardProps } from "./RouteEventCard.types";
import ScaleBadge from "@/application/components/ui/Badge/ScaleBadge/ScaleBadge";
import { useTranslation } from "react-i18next";
import SimpleMap from "@/application/features/maps/SimpleMap/SimpleMap";
import { v4 as uuidv4 } from 'uuid';

const RouteEventCard = ({ routeEvent, extras }: RouteEventCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["eventsCreation"]);

  return <div className="routeCard bg-background cursor-pointer grid relative p-5 pt-10 border-t border-primary mb-8" 
    onClick={ () => { navigate(`/showevent/${routeEvent.id}`)}}> 
    <h2 className="font-bold row-start-1 row-end-2 col-start-1 col-end-3 sm:text-2xl">{ routeEvent.name }</h2>
    <span className="col-start-1 col-end-3">
      { routeEvent.rid && routeEvent.routeName ? <>{ routeEvent.routeName }</> : <>{ t("creation.not assigned route") }</> }
    </span>
    <span className="row-start-3 row-end-4">
      { new Date(routeEvent.date).toLocaleDateString() }
    </span>
    <div className="row-start-3 row-end-4 col-start-1 col-end-2 text-xs sm:text-base max-h-5">
      <ScaleBadge scale={ routeEvent.scale } />
    </div>
    { routeEvent.location ? <>
      <SimpleMap id={`${uuidv4()}` } point={ routeEvent.location } 
        containerClassName="w-full z-10 mt-2 h-25 col-start-1 col-end-3" zoomScale={ 0.005 }
        width="w-full" height="h-25" />
      </> : <></> }
    { extras }
  </div>
}

export default RouteEventCard;