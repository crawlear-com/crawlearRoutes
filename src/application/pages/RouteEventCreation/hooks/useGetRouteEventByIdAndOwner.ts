import * as React from "react";
import toast from "react-hot-toast";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import { useTranslation } from "react-i18next";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const useGetRouteEventByIdAndOwner = ( setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<RouteEvent | undefined>>,
  uid: string, eid?: string,) => {
  const { t } = useTranslation(["myEvents"]);

  React.useEffect(() => {
    const repository = new SupabaseRouteEventRepository();
    const provider = new RouteEventDataProvider(repository);
    
    if (eid && uid) {
      setIsLoading(true);
      const promise = provider.getRouteEventByIdAndOwner(uid, eid)
      
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