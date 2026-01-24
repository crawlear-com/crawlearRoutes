import * as React from "react";
import { getRouteEventByIdAndOwner } from "@/database/eventsRpc";
import toast from "react-hot-toast";
import type { RouteEvent } from "@/types/RouteEvent.types";

const useGetRouteEventByIdAndOwner = ( setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<RouteEvent | undefined>>,
  uid: string, eid?: string,) => {

  React.useEffect(() => {
    if (eid && uid) {
      setIsLoading(true);
      const promise = getRouteEventByIdAndOwner(uid, eid)
      
      promise.then((routeEvent) => {
        setIsLoading(false);
        setData(routeEvent);
      }).catch((e: unknown) => {
          toast.error((e as Error).message);
          setIsLoading(false);
        });
    }
  }, [eid, uid, setIsLoading, setData]);
}

export default useGetRouteEventByIdAndOwner;