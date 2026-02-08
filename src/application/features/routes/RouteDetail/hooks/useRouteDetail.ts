import * as React from "react";
import type { Route } from "@/domain/Route.types";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import SupabaseRouteRepository from "@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository";
import RouteDataProvider from "@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider";

const useRouteDetail = (rid: string | undefined): [ Route | undefined, boolean ] => {
  const [route, setRoute ] = React.useState<Route>();
  const [ isLoading, setIsLoading ] = React.useState(false);
  const { t } = useTranslation("myRoutes");  
  const paramsRid = useParams().id;
  const id = rid || paramsRid;

  React.useEffect(() => {
    const repository = new SupabaseRouteRepository();
    const provider = new RouteDataProvider(repository);

    if (id) {
      setIsLoading(true);
      const promise = provider.getRoute(id);

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