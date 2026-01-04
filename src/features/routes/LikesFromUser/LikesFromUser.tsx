import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import { getLikesFromUserFull } from "../../../database/MyRoutesRpc";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";

import type { Route } from "../../../types/Route.types";
import RoutesPaginator from "../RoutesList/RoutesPaginator";
import RoutesListFilter from "../RoutesList/RoutesListFilter";
import Spinner from "../../../components/Spinner/Spinner";

const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ currentPage, totalRoutes, routes, isLoading, onPageClick, onOrderByClick, onOrderDirClick, onQueryChange ] = useRoutesProvider(getLikesFromUserFull);
  
  return (<div className="w-full lg:w-[50%]">
    <h1 className="mr-3 inline-block">{ t("main.favourite routes") }</h1>
    <RoutesListFilter onOrderByClick= { onOrderByClick} onOrderDirClick= { onOrderDirClick} onQueryChange={onQueryChange} />
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalRoutes } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <RoutesList card={ myRoutesCard } routes={ routes } /> }
    </div>);
}

export default LikesFromUser;