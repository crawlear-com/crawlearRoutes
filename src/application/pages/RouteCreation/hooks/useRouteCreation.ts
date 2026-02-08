import { loadRoute, setAction, setEventId, setRouteId } from "@/application/features/routeCreation/store/slices/routeSlice";
import { selectIsLoading } from "@/application/features/users/store/selectors/userSelectors";
import { CREATE_ACTION, UPDATE_ACTION } from "@/application/helpers/utils";
import type { AppDispatch } from "@/application/store/store";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const useRouteCreation = (): [ boolean, string | undefined, string | undefined ] => {
  const rid = useParams().rid;
  const eid = useParams().eid;
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);

  React.useEffect(() => {
    if (eid) {
      dispatch(setEventId(eid));
      dispatch(setAction(CREATE_ACTION));
    }

    if (rid) {
      dispatch(setRouteId(rid));
      dispatch(setAction(UPDATE_ACTION))
      dispatch(loadRoute(rid));
    } else {
      dispatch(setAction(CREATE_ACTION))
    }
  }, [rid, eid, dispatch]);

  return [ isLoading, rid, eid ];
}

export default useRouteCreation;