import { useTranslation } from "react-i18next";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";
import { getLikesFromUserFull } from "../../../database/MyRoutesRpc";

import type { Route } from "../../../types/Route.types";


const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;

  return <RoutesList title={ t("main.favourite routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } rpc={ getLikesFromUserFull } />;
}

export default LikesFromUser;