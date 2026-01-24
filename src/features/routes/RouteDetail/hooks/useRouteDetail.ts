import * as React from "react";
import type { Route } from "@/types/Route.types";
import { useParams } from "react-router";
import { getRoute } from "@/database/routeRpc";
import toast from "react-hot-toast";

const useRouteDetail = (rid: string | undefined): [ Route | undefined, boolean ] => {
  const [route, setRoute ] = React.useState<Route>();
  const [ isLoading, setIsLoading ] = React.useState(false);

  const paramsRid = useParams().id;
  const id = rid || paramsRid;

  React.useEffect(() => {
    if (id) {
      setIsLoading(true);
      const promise = getRoute(id);

      promise.then((route) => {
        setIsLoading(false);
        setRoute(route);
      }).catch((e: unknown) => {
        setIsLoading(false);
        toast.error((e as Error).message);
    });
    }
  }, [setRoute, id]);

  return [ route, isLoading ];
}

export default useRouteDetail;