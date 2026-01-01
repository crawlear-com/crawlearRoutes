import * as React from 'react';
import { toast } from 'react-hot-toast';
import type { Route } from '../../types/Route.types';
import { useSelector } from 'react-redux';
import { selectUserUUID } from '../../features/users/store/selectors/userSelectors';
import type { RoutesData } from './routesData';

const useRoutesProvider = (rpc: (uuid: string, page: number) => Promise<RoutesData>): [ number, number, Array<Route>, (page: number) => void ] => {
  const [ routes, setRoutes ] = React.useState<Array<Route>>([]);
  const [ totalRoutes, setTotalRoutes ] = React.useState<number>(0);
  const [ currentPage, setCurrentPage ] = React.useState<number>(0);
  const uuid = useSelector(selectUserUUID);
  const onPageClick = (page: number) => {
    setCurrentPage(page);
  }

  React.useEffect(() => {
    if (uuid) {
      const getData = async () => {
        try {
          const data =  await rpc(uuid, currentPage + 1);

          setRoutes(data.routes);
          setTotalRoutes(data.total_count);
        } catch(e: unknown) {
          toast.error((e as Error).message)
        }
      }

      getData();
    }
  }, [uuid, currentPage, rpc]);

  return [ currentPage, totalRoutes, routes, onPageClick ];
}

export default useRoutesProvider;