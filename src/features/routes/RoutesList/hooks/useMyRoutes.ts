import * as React from 'react';
import { toast } from 'react-hot-toast';
import type { Route } from '../../../../types/Route.types';
import { useSelector } from 'react-redux';
import { selectUserUUID } from '../../../users/store/selectors/userSelectors';
import { getMyRoutes } from '../../../../database/supabaseClient';

const useMyRoutes = (): [number, Array<Route>] => {
  const [ routeList, setRouteList ] = React.useState<Array<Route>>([]);
  const [ totalMyRoutes, setTotalMyRoutes ] = React.useState<number>(0);
  const uuid = useSelector(selectUserUUID);

  React.useEffect(() => {
    if (uuid) {
      const getData = async () => {
        try {
          const data =  await getMyRoutes(uuid);

          setRouteList(data.routes);
          setTotalMyRoutes(data.total_count);
        } catch(e: unknown) {
          toast.error((e as Error).message)
        }
      }

      getData();
    }
  }, [uuid]);

  return [totalMyRoutes, routeList];
}

export default useMyRoutes;