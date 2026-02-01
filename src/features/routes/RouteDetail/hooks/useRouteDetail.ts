import * as React from "react";
import type { Route } from "@/types/Route.types";
import { useParams } from "react-router";
import { getRoute } from "@/database/routeRpc";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useRouteDetail = (rid: string | undefined): [ Route | undefined, boolean ] => {
  const [route, setRoute ] = React.useState<Route>();
  const [ isLoading, setIsLoading ] = React.useState(false);
  const { t } = useTranslation("myRoutes");

  const paramsRid = useParams().id;
  const id = rid || paramsRid;

  React.useEffect(() => {
    if (id) {
      setIsLoading(true);
      const promise = getRoute(id);

      promise.then((route) => {
        setIsLoading(false);
        setRoute(route);
      }).catch(() => {
        setIsLoading(false);
        toast.error(t("errors.not loaded"));
    });
    }
  }, [setRoute, id, t]);

  return [ route, isLoading ];
}

export default useRouteDetail;