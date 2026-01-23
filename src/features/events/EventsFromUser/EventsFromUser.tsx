import useRouteEventsProvider from "../hooks/useRouteEventsProvider";
import { useTranslation } from "react-i18next";
import { getMyRouteEventsPaginated } from "../store/slices/eventListsSlice";
import useEventsFromUser from "./hooks/useEventsFromUser";
import ItemsList from "../../../components/ItemsList/ItemsList";
import type { RouteEvent } from "../../../types/RouteEvent.types";

const EventsFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myEventsCard, setMethods, selectMethods ] = useEventsFromUser();

  return <ItemsList<RouteEvent> title={ t("main.my routes") } card={ myEventsCard }
    hook={ useRouteEventsProvider } thunk={ getMyRouteEventsPaginated } setMethods={ setMethods }
    selectMethods={ selectMethods }/>;
}

export default EventsFromUser;