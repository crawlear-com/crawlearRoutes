import * as React from "react";
import { useParams } from "react-router";

import toast from "react-hot-toast";
import type { RouteEvent } from "../../../../types/RouteEvent.types";
import { selectUserUUID } from "../../../users/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import { getRouteEventByIdAndOwner } from "../../../../database/eventsRpc";

const useEventDetail = (eid?: string): [ RouteEvent | undefined, boolean ] => {
  const [event, setEvent ] = React.useState<RouteEvent>();
  const paramsId = useParams().id;
  const id = eid || paramsId;
  const uid = useSelector(selectUserUUID);
  const [ isLoading, setIsLoading ] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      setIsLoading(true);
      const promise = getRouteEventByIdAndOwner(uid, id);

      promise.then((event) => {
        setEvent(event);
        setIsLoading(false);
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
        setIsLoading(false);
      });
    }
  }, [setEvent, id, uid]);

  return [ event, isLoading ]
}

export default useEventDetail;