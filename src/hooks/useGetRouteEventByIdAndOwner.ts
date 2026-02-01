import * as React from "react";
import { getRouteEventByIdAndOwner } from "@/database/eventsRpc";
import toast from "react-hot-toast";
import type { RouteEvent } from "@/types/RouteEvent.types";
import { useTranslation } from "react-i18next";

const useGetRouteEventByIdAndOwner = ( setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<RouteEvent | undefined>>,
  uid: string, eid?: string,) => {
    const { t } = useTranslation(["myEvents"]);

  React.useEffect(() => {
    if (eid && uid) {
      setIsLoading(true);
      const promise = getRouteEventByIdAndOwner(uid, eid)
      
      promise.then((routeEvent) => {
        setIsLoading(false);
        setData(routeEvent);
      }).catch(() => {
          toast.error(t("errors.error loading event"));
          setIsLoading(false);
        });
    }
  }, [eid, uid, setIsLoading, setData, t]);
}

export default useGetRouteEventByIdAndOwner;