import useGuard from "../../../hooks/useGuard";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import useMyRoutes from "./hooks/useMyRoutes";

import type { Route } from "../../../types/Route.types";

const RoutesFromUser = () => {
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;
  const [ totalMyRoutes, myRoutes ] = useMyRoutes();
  useGuard();
  
  return (<main>
    <h1 className="mr-3 mt-15 inline">My routes</h1><button className="text-xl button-primary w-auto px-2 inline">+</button>
    <RoutesList card={ myRoutesCard } totalRoutes={ totalMyRoutes} routes={ myRoutes } />
  </main>);

}

export default RoutesFromUser;