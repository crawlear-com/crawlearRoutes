import Spinner from "@/components/ui/Spinner/Spinner";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import RouteEventCard from "../RouteEventCard/RouteEventCard";
import ItemCardList from "@/components/ItemCardList/ItemCardList";
import { useTranslation } from "react-i18next";
import useEventsNearYou from "./hooks/useEventsNearYou";

const EventsNearYou = () => {
  const { t } = useTranslation("myEvents");
  const [ isLoading, routeEvents ] = useEventsNearYou();
  const routeEventCard = (event: RouteEvent) => 
    <RouteEventCard key={ event.id } routeEvent={ event } />;

  return (<div>
    <h1 className="mr-3 mb-4 text-right">{ t("main.events near you") }</h1>
    { isLoading ? <Spinner /> : 
      <>{ <ItemCardList<RouteEvent> items={ routeEvents } card={ routeEventCard }/> }</>
    }
  </div>);
}

export default EventsNearYou;