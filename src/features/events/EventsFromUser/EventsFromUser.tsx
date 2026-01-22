import useRoutesProvider from "../hooks/useRouteEventsProvider";
import { useTranslation } from "react-i18next";
import { getMyRouteEventsPaginated } from "../store/slices/eventListsSlice";
import useRoutesFromUser from "./hooks/useEventsFromUser";
import ItemsList from "../../../components/ItemsList/ItemsList";
import type { RouteEvent } from "../../../types/RouteEvent.types";

const EventsFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const [ myRoutesCard, setMethods, selectMethods ] = useRoutesFromUser();

  return <ItemsList<RouteEvent> title={ t("main.my routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyRouteEventsPaginated } setMethods={ setMethods }
    selectMethods={ selectMethods }/>;
}

export default EventsFromUser;