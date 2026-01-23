import * as React from "react";
import { useParams } from "react-router";

import toast from "react-hot-toast";
import type { RouteEvent } from "../../../../types/RouteEvent.types";
import { selectUserUUID } from "../../../users/store/selectors/userSelectors";
import { useSelector } from "react-redux";
import { getRouteEventByIdAndOwner } from "../../../../database/eventsRpc";

const useEventDetail = () => {
  const [event, setEvent ] = React.useState<RouteEvent>();
  const id = useParams().id;
  const uid = useSelector(selectUserUUID);

  React.useEffect(() => {
    if (id) {
      const promise = getRouteEventByIdAndOwner(uid, id);

      promise.then((event) => {
        setEvent(event);
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
    });
    }
  }, [setEvent, id, uid]);

  return [ event ]
}

export default useEventDetail;