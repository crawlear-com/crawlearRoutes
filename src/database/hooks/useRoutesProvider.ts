import * as React from 'react';
import { toast } from 'react-hot-toast';
import type { Route } from '../../types/Route.types';
import { useSelector } from 'react-redux';
import { selectUserUUID } from '../../features/users/store/selectors/userSelectors';
import type { RoutesDataFromProvider } from './RoutesDataFromProvider.types';

const useRoutesProvider = (rpc: (uuid: string, page: number, order_by: string,
  order_dir: string, query: string) => Promise<RoutesDataFromProvider>): 
  [ number, number, Array<Route>, (page: number) => void, (order: string) =>  void, (order: string) =>  void, (query: string) =>  void ] => {
  
  const [ routes, setRoutes ] = React.useState<Array<Route>>([]);
  const [ totalRoutes, setTotalRoutes ] = React.useState<number>(0);
  const [ currentPage, setCurrentPage ] = React.useState<number>(0);
  const [ orderBy, setOrderBy ] = React.useState<string>('name');
  const [ orderDir, setOrderDir ] = React.useState<string>('asc');
  const [ query, setQuery ] = React.useState<string>('');
  const [ bouncingTimeout, setBouncingTimeout ] = React.useState(0);
  const uuid = useSelector(selectUserUUID);
  const onPageClick = (page: number) => {
    setCurrentPage(page);
  }
  const onOrderByClick = (order: string) => {
    setOrderBy(order);
  }
  const onOrderDirClick = (order: string) => {
    setOrderDir(order);
  }
  const onQueryChange = (query: string) => {
    if (bouncingTimeout !== 0) {
      clearTimeout(bouncingTimeout);
    }
    setBouncingTimeout(setTimeout(() => {
      setQuery(query);
    }, 1000));
  }
  React.useEffect(() => {
    if (uuid) {
      const getData = async () => {
        try {
          const data =  await rpc(uuid, currentPage + 1, orderBy, orderDir, query);

          setRoutes(data.routes);
          setTotalRoutes(data.total_count);
        } catch(e: unknown) {
          toast.error((e as Error).message)
        }
      }

      getData();
    }
  }, [uuid, currentPage, rpc, orderBy, orderDir, query]);

  return [ currentPage, totalRoutes, routes, onPageClick, onOrderByClick, onOrderDirClick, onQueryChange ];
}

export default useRoutesProvider;