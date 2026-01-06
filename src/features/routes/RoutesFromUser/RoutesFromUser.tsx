import RouteCard from "../RouteCard/RouteCard";
import { getMyRoutesFull } from "../../../database/MyRoutesRpc";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";

import type { Route } from "../../../types/Route.types";


const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;

  return <RoutesList title={ t("main.my routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } rpc={ getMyRoutesFull } />;
}

export default RoutesFromUser;