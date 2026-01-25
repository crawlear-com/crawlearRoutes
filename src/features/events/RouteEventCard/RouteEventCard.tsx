import { useNavigate } from "react-router";
import type { RouteEventCardProps } from "./RouteEventCard.types";
import ScaleBadge from "@/components/ui/Badge/ScaleBadge/ScaleBadge";
import { useTranslation } from "react-i18next";

const RouteEventCard = ({ routeEvent, extras }: RouteEventCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["eventsCreation"]);

  return <div className="routeCard bg-background cursor-pointer grid relative p-5 pt-10 border-t border-primary mb-8" 
    onClick={ () => { navigate(`/showevent/${routeEvent.id}`)}}> 
    <h2 className="row-start-1 row-end-2 col-start-1 col-end-3 sm:text-2xl">{ routeEvent.name }</h2>
    <div className="row-start-2 row-end-3 col-start-1 col-end-2 text-xs sm:text-base max-h-5">
      <ScaleBadge scale={ routeEvent.scale } />
    </div>
    { routeEvent.rid ? <>{ t("creation.assigned route") }</> : <>{ t("creation.not assigned route") }</> }
    { extras }
  </div>
}

export default RouteEventCard;