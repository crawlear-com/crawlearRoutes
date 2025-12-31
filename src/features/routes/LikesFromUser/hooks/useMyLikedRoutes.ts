import * as React from 'react';
import { toast } from 'react-hot-toast';
import type { Route } from '../../../../types/Route.types';
import { useSelector } from 'react-redux';
import { selectUserUUID } from '../../../users/store/selectors/userSelectors';
import { getLikesFromUser } from '../../../../database/supabaseClient';

const useMyLikedRoutes = (): [ Array<Route> ] => {
  const [ likedRoutes, setLikedRoutes ] = React.useState<Array<Route>>([]);
  const uuid = useSelector(selectUserUUID);

  React.useEffect(() => {
    if (uuid) {
      const getData = async () => {
        try {
          const data =  await getLikesFromUser(uuid);

          setLikedRoutes(data);
        } catch(e: unknown) {
          toast.error((e as Error).message)
        }
      }

      getData();
    }
  }, [uuid]);

  return [ likedRoutes ];
}

export default useMyLikedRoutes;