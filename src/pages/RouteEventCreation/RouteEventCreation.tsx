import * as React from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import RouteEventsDataForm from "../../features/events/RouteEventsDataForm/RouteEventsDataForm";
import type { RouteEvent } from "../../types/RouteEvent.types";

const loadRouteEvent =(rid: string) => {
  console.log(rid);
}

const RouteEventCreation = () => {
  const { t } = useTranslation(["eventsCreation"]);
  const rid = useParams().id;
  const date = useParams().date;
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ routeEvent ] = React.useState<RouteEvent | undefined>(undefined);
  const [ eventDate ] = React.useState<Date>(new Date(Number(date) || 0));

  React.useEffect(() => {
    if (rid) {
      setIsLoading(true);
      loadRouteEvent(rid);
    } else {
      setIsLoading(false);
    }
  }, [rid]);

  return (<>
    <Header />
    <main className="sm:w-[90%] m-auto min-h-[80vh] mt-10">
      <h1>{ rid ? t("main.event update") : t("main.event creation") }</h1>
      { isLoading ? <Spinner /> : 
        routeEvent ? <RouteEventsDataForm date={ eventDate } routeEvent={ routeEvent } /> :
          <RouteEventsDataForm date={ eventDate } /> }
    </main>
    <Footer />
  </>);
}

export default RouteEventCreation;