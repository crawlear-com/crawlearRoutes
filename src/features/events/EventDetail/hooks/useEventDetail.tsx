import * as React from "react";
import type { RouteEvent } from "@/types/RouteEvent.types";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const useEventDetail = (eid: string): [ RouteEvent | undefined, boolean ] => {
  const [routeEvent, setRouteEvent ] = React.useState<RouteEvent>();
  const [ isLoading, setIsLoading ] = React.useState(false);
  const { t } = useTranslation(["myEvents"]);

   React.useEffect(() => {
    const repository = new SupabaseRouteEventRepository();
    const provider = new RouteEventDataProvider(repository);

    if (eid) {
      setIsLoading(true);
      const promise = provider.getRouteEventById(eid)
      
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