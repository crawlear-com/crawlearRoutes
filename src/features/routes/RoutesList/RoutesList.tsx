import type { Route } from '../../../types/Route.types';
import type { RoutesListProps } from './RoutesList.types';

const RoutesList = ({ card, totalRoutes, routes }: RoutesListProps) => {
  return (<div className="w-[90%] mx-auto mb-15 text-right">
    <div className="flex justify-end items-center mb-5 m-auto">
      <input className="flex-2 justify-self-start border border-gray-500 shadow mx-2 px-1" 
        placeholder="Filter routes..." type="text" />
      Order by:
      <div className="button-primary w-auto mx-1 cursor-pointer">Name ^</div>
      <div className="button-primary w-auto mr-1 cursor-pointer">Date ^</div>
      <div className="button-primary w-auto mr-1 cursor-pointer">Likes ^</div>
    </div>
    Total: { totalRoutes }
    { routes.map((route: Route) => card(route)) }
  </div>);
}

export default RoutesList;