import type { Route } from '../../../types/Route.types';
import type { RoutesCardListProps } from './types/RoutesCardList.types';
import { useTranslation } from 'react-i18next';

const RoutesCardList = ({ card, routes }: RoutesCardListProps) => {
  const { t } = useTranslation(["myRoutes"]);

  return (<div className="container text-right">
    { routes.length > 0 ? routes.map((route: Route) => card(route)) : 
      <div className='text-center'>{ t("main.no routes") }</div>}
  </div>);
}

export default RoutesCardList;