import useGuard from "../../../hooks/useGuard";
import type { Route } from "../../../types/Route.types";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import RoutesPaginator from "../RoutesList/RoutesPaginator";
import { getLikesFromUserPage } from "../../../database/MyRoutesRpc";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";

const LikesFromUser = () => {
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ currentPage, totalMyRoutes, likedRoutes, onPageClick ] = useRoutesProvider(getLikesFromUserPage);
  useGuard();
  
  return (<>
    <h1 className="mr-3">Favourite routes</h1>
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalMyRoutes } onPageClick={ onPageClick } />
    <RoutesList card={ myRoutesCard } totalRoutes={ 0 } routes={ likedRoutes } />
    </>);
}

export default LikesFromUser;