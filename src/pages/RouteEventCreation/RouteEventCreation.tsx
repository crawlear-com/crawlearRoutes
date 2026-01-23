import * as React from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import RouteEventsDataForm from "../../features/events/RouteEventsDataForm/RouteEventsDataForm";
import type { RouteEvent } from "../../types/RouteEvent.types";
import { selectUserUUID } from "../../features/users/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import { getRouteEventByIdAndOwner } from "../../database/eventsRpc";
import toast from "react-hot-toast";

const RouteEventCreation = () => {
  const { t } = useTranslation(["eventsCreation"]);
  const eid = useParams().id;
  const date = useParams().date;
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ routeEvent, setRouteEvent ] = React.useState<RouteEvent | undefined>(undefined);
  const [ eventDate ] = React.useState<Date>(new Date(Number(date) || 0));
  const userId = useSelector(selectUserUUID);

  React.useEffect(() => {
    if (eid && userId) {
      setIsLoading(true);
      getRouteEventByIdAndOwner(userId, eid).then((event) => {
        setIsLoading(false);
        setRouteEvent(event);
      }).catch((e: unknown) => {
          toast.error((e as Error).message);
        });
    } else {
      setIsLoading(false);
    }
  }, [eid, userId]);

  return (<>
    <Header />
    <main className="sm:w-[90%] m-auto min-h-[80vh] mt-10">
      <h1>{ eid ? t("main.event update") : t("main.event creation") }</h1>
      { isLoading ? <Spinner /> : 
        routeEvent ? <RouteEventsDataForm date={ eventDate } routeEvent={ routeEvent } /> :
          <RouteEventsDataForm date={ eventDate } /> }
    </main>
    <Footer />
  </>);
}

export default RouteEventCreation;