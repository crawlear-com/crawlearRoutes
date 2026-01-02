import useGuard from "../../../hooks/useGuard";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import { getLikesFromUserFull } from "../../../database/MyRoutesRpc";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";

import type { Route } from "../../../types/Route.types";
import RoutesPaginator from "../RoutesList/RoutesPaginator";
import RoutesListFilter from "../RoutesList/RoutesListFilter";

const LikesFromUser = () => {
  useGuard();

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ currentPage, totalRoutes, routes, onPageClick, onOrderByClick, onOrderDirClick, onQueryChange ] = useRoutesProvider(getLikesFromUserFull);
  
  return (<>
    <h1 className="mr-3 mt-25 inline-block">Favourite routes</h1>
    <RoutesListFilter onOrderByClick= { onOrderByClick} onOrderDirClick= { onOrderDirClick} onQueryChange={onQueryChange} />
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalRoutes } onPageClick={ onPageClick } />
    <RoutesList card={ myRoutesCard } routes={ routes } />
    </>);
}

export default LikesFromUser;