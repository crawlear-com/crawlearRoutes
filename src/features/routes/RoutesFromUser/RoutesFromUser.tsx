import useGuard from "../../../hooks/useGuard";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import { getMyRoutesFull } from "../../../database/MyRoutesRpc";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";

import type { Route } from "../../../types/Route.types";
import RoutesPaginator from "../RoutesList/RoutesPaginator";
import RoutesListFilter from "../RoutesList/RoutesListFilter";

const RoutesFromUser = () => {
  useGuard();
  const { t } = useTranslation(['myRoutes']);

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ currentPage, totalRoutes, routes, onPageClick, onOrderByClick, onOrderDirClick, onQueryChange ] = useRoutesProvider(getMyRoutesFull);

  return (<div className="w-full lg:w-[50%]">
    <h1 className="mr-3 inline-block">{ t("main.my routes") }</h1><button className="text-xl button-primary w-auto px-2 inline">+</button>
    <RoutesListFilter onOrderByClick= { onOrderByClick} onOrderDirClick= { onOrderDirClick} onQueryChange={onQueryChange} />
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalRoutes } onPageClick={ onPageClick } />
    <RoutesList card={ myRoutesCard } routes={ routes } />
  </div>);

}

export default RoutesFromUser;