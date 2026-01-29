import * as React from "react";
import type { RouteEvent } from "@/types/RouteEvent.types";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import useGetRouteEventByIdAndOwner from "@/hooks/useGetRouteEventByIdAndOwner";

const useEventDetail = (eid: string): [ RouteEvent | undefined, boolean ] => {
  const [routeEvent, setRouteEvent ] = React.useState<RouteEvent>();
  const uid = useSelector(selectUserUUID);
  const [ isLoading, setIsLoading ] = React.useState(false);

  useGetRouteEventByIdAndOwner(setIsLoading, setRouteEvent, uid, eid);
  
  return [ routeEvent, isLoading ]
}

export default useEventDetail;