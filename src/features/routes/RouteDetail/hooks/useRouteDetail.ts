import * as React from "react";
import type { Route } from "../../../../types/Route.types";
import { useParams } from "react-router";
import { getRoute } from "../../../../database/routeRpc";
import toast from "react-hot-toast";

const useRouteDetail = (rid: string | undefined) => {
  const [route, setRoute ] = React.useState<Route>();
  const paramsRid = useParams().id;
  const id = rid || paramsRid;

  React.useEffect(() => {
    if (id) {
      const promise = getRoute(id);

      promise.then((route) => {
        setRoute(route);
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
    });
    }
  }, [setRoute, id]);

  return [ route ]
}

export default useRouteDetail;