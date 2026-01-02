import useGuard from "../../../hooks/useGuard";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import { getMyRoutesFull } from "../../../database/MyRoutesRpc";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";
import RoutesPaginator from "../RoutesList/RoutesPaginator";
import RoutesListFilter from "../RoutesList/RoutesListFilter";
import Spinner from "../../../components/Spinner/Spinner";

import type { Route } from "../../../types/Route.types";

const RoutesFromUser = () => {
  useGuard();
  const { t } = useTranslation(['myRoutes']);

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ currentPage, totalRoutes, routes, isLoading, onPageClick, onOrderByClick, onOrderDirClick, onQueryChange ] = useRoutesProvider(getMyRoutesFull);

  return (<div className="w-full lg:w-[50%]">
    <h1 className="mr-3 inline-block">{ t("main.my routes") }</h1><button className="text-xl button-primary w-auto px-2 inline">+</button>
    <RoutesListFilter onOrderByClick= { onOrderByClick} onOrderDirClick= { onOrderDirClick} onQueryChange={onQueryChange} />
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalRoutes } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <RoutesList card={ myRoutesCard } routes={ routes } /> }
  </div>);

}

export default RoutesFromUser;