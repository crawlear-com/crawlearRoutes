import useGuard from "../../../hooks/useGuard";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import { getMyRoutesPage } from "../../../database/MyRoutesRpc";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";

import type { Route } from "../../../types/Route.types";
import RoutesPaginator from "../RoutesList/RoutesPaginator";

const RoutesFromUser = () => {
  useGuard();

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ currentPage, totalMyRoutes, myRoutes, onPageClick ] = useRoutesProvider(getMyRoutesPage);

  return (<main>
    <h1 className="mr-3 mt-15 inline">My routes</h1><button className="text-xl button-primary w-auto px-2 inline">+</button>
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalMyRoutes } onPageClick={ onPageClick } />
    <RoutesList card={ myRoutesCard } totalRoutes={ totalMyRoutes} routes={ myRoutes } />
  </main>);

}

export default RoutesFromUser;