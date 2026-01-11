import type { Route } from '../../../types/Route.types';
import type { RoutesCardListProps } from './types/RoutesCardList.types';

const RoutesCardList = ({ card, routes }: RoutesCardListProps) => {
  return (<div className="container text-right">
    { routes.map((route: Route) => card(route)) }
  </div>);
}

export default RoutesCardList;