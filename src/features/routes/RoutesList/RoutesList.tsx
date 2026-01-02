import type { Route } from '../../../types/Route.types';
import type { RoutesListProps } from './types/RoutesList.types';

const RoutesList = ({ card, routes }: RoutesListProps) => {
  return (<div className="container text-right">
    { routes.map((route: Route) => card(route)) }
  </div>);
}

export default RoutesList;