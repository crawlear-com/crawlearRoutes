import * as React from 'react';
import { toast } from 'react-hot-toast';
import type { Route } from '../../types/Route.types';
import { useSelector } from 'react-redux';
import { selectUserUUID } from '../../features/users/store/selectors/userSelectors';
import type { RoutesDataFromProvider } from './RoutesDataFromProvider.types';

const useRoutesProvider = (rpc: (uuid: string, page: number, order_by: string,
  order_dir: string, query: string) => Promise<RoutesDataFromProvider>): 
  [ number, number, Array<Route>, boolean, (page: number) => void, (order: string) =>  void, (order: string) =>  void, (query: string) =>  void ] => {
  
  const [ routes, setRoutes ] = React.useState<Array<Route>>([]);
  const [ totalRoutes, setTotalRoutes ] = React.useState<number>(0);
  const [ currentPage, setCurrentPage ] = React.useState<number>(0);
  const [ orderBy, setOrderBy ] = React.useState<string>('name');
  const [ orderDir, setOrderDir ] = React.useState<string>('asc');
  const [ query, setQuery ] = React.useState<string>('');
  const [ isLoading, setIsLoading ] = React.useState(false);
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
      setQuery(query);
    };

  React.useEffect(() => {
    if (uuid) {
      setIsLoading(true);
      const getData = async () => {
        const promise = rpc(uuid, currentPage + 1, orderBy, orderDir, query);

        promise.then((data) => {
          setRoutes(data.routes);
          setTotalRoutes(data.total_count);
          setIsLoading(false);
        }).catch((e: unknown) => {
          toast.error((e as Error).message)
          setIsLoading(false);
        });
      };

      getData();
    }
  }, [uuid, currentPage, rpc, orderBy, orderDir, query]);

  return [ currentPage, totalRoutes, routes, isLoading, onPageClick, onOrderByClick, onOrderDirClick, onQueryChange ];
}

export default useRoutesProvider;