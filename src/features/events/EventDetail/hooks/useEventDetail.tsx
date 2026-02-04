import * as React from "react";
import type { RouteEvent } from "@/types/RouteEvent.types";
import { getRouteEventById } from "@/database/eventsRpc";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useEventDetail = (eid: string): [ RouteEvent | undefined, boolean ] => {
  const [routeEvent, setRouteEvent ] = React.useState<RouteEvent>();
  const [ isLoading, setIsLoading ] = React.useState(false);
  const { t } = useTranslation(["myEvents"]);

   React.useEffect(() => {
    if (eid) {
      setIsLoading(true);
      const promise = getRouteEventById(eid)
      
      promise.then((routeEvent) => {
        setIsLoading(false);
        setRouteEvent(routeEvent);
      }).catch(() => {
          toast.error(t("errors.error loading event"));
          setIsLoading(false);
        });
    }
  }, [eid, setIsLoading, setRouteEvent, t]);
  
  return [ routeEvent, isLoading ]
}

export default useEventDetail;