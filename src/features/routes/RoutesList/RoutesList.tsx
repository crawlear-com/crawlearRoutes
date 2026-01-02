import type { Route } from '../../../types/Route.types';
import type { RoutesListProps } from './RoutesList.types';

const RoutesList = ({ card, routes }: RoutesListProps) => {
  return (<div className="container text-right">
    { routes.map((route: Route) => card(route)) }
  </div>);
}

export default RoutesList;