import * as React from "react";
import type { Route } from "../../../types/Route.types";
import type { RouteEvent } from "../../../types/RouteEvent.types";
import GpxRecorder from "../../routeCreation/GpxRecorder/GpxRecorder";
import { useTranslation } from "react-i18next";
import { getRoute } from "../../../database/routeRpc";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import RouteDetail from "../../routes/RouteDetail/RouteDetail";
import EventDetail from "../EventDetail/EventDetail";

type EventRouteRecorderProps = {
  routeEvent: RouteEvent;
}

const EventRouteRecorder = ({ routeEvent }: EventRouteRecorderProps) => {
  const { t } = useTranslation(["eventsCreation"]);
  const [ route, setRoute ] = React.useState<Route>();
  const [ isLoading, setIsLoading ] = React.useState(false);

  React.useEffect(() => {
    if (routeEvent.rid) {
      setIsLoading(true);
      const promise = getRoute(routeEvent.rid);

      promise.then((route) => {
        setRoute(route);
        setIsLoading(false);
      }).catch((e: unknown) => {
        setIsLoading(false);
        toast.error((e as Error).message);
    });
    }
  }, [setRoute, routeEvent.rid]);

  return (<div className="m-5">
    <EventDetail eid={ routeEvent.id } />
    { !routeEvent.rid || routeEvent.rid.length === 0 ? <>
        <h1>{ t("creation.create route for event") }</h1>
        <GpxRecorder />
      </> : <>
      { isLoading ? <Spinner /> : 
        route ? <RouteDetail rid={ route.id } /> : <></> }
    </>}
    
  </div>);
}

export default EventRouteRecorder;