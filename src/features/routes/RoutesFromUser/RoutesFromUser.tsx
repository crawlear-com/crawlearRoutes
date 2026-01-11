import RouteCard from "../RouteCard/RouteCard";
import { getMyRoutesFull, deleteRoute } from "../../../database/MyRoutesRpc";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";

import type { Route } from "../../../types/Route.types";
import toast from "react-hot-toast";

const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const deleteRouteById = (id: string) => {
    const promise = deleteRoute(id);

    promise.then(() => {
      toast.success("Route removed");
    }).catch((e: unknown) => {
      toast.error((e as Error).message);
    });
  }
  const deleteExtras = (id: string) => <div onClick={() => deleteRouteById(id)}>delete</div>
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } extras={ deleteExtras(route.id) } />;

  return <RoutesList title={ t("main.my routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } rpc={ getMyRoutesFull } />;
}

export default RoutesFromUser;