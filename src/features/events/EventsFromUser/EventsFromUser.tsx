import useRouteEventsProvider from "../hooks/useRouteEventsProvider";
import { useTranslation } from "react-i18next";
import { getMyRouteEventsPaginated } from "../store/slices/eventListsSlice";
import useEventsFromUser from "./hooks/useEventsFromUser";
import ItemsList from "@/components/ItemsList/ItemsList";
import type { RouteEvent } from "@/types/RouteEvent.types";

const EventsFromUser = () => {
  const { t } = useTranslation(['eventsCreation']);
  const [ myEventsCard, setMethods, selectMethods ] = useEventsFromUser();

  return <div className="card flex-1 self-start container text-right p-10">
      <ItemsList<RouteEvent> title={ t("main.my events") } card={ myEventsCard }
      hook={ useRouteEventsProvider } thunk={ getMyRouteEventsPaginated } 
      setMethods={ setMethods } selectMethods={ selectMethods }/>
    </div>
}

export default EventsFromUser;