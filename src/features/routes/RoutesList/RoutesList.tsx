import RoutesCardList from "../RoutesCardList/RoutesCardList";
import RoutesPaginator from "../RoutesCardList/RoutesPaginator";
import RoutesListFilter from "../RoutesCardList/RoutesListFilter";
import Spinner from "../../../components/Spinner/Spinner";

import type { Route } from "../../../types/Route.types";
import type { RoutesDataFromProvider } from "../../../database/hooks/RoutesDataFromProvider.types";

type RoutesListProps = {
  title: string,
  card: (route: Route) => React.ReactElement,
  hook: (rpc: (uuid: string, page: number, order_by: string, order_dir: string, query: string) => Promise<RoutesDataFromProvider>) => [number, number, Array<Route>, boolean, (page: number) => void, (order: string) => void, (order: string) => void, (query: string) => void]
  rpc: (uuid: string, page: number, order_by: string, order_dir: string, query: string) => Promise<RoutesDataFromProvider>
}

const RoutesList = ({ title, card, hook, rpc}: RoutesListProps) => {
  const [ currentPage, totalRoutes, routes, isLoading, onPageClick, onOrderByClick, 
    onOrderDirClick, onQueryChange ] = hook(rpc);

  return (<div className="w-full lg:w-[50%]">
    <h1 className="mr-3 inline-block">{ title }</h1><button className="text-xl button-primary w-auto px-2 inline">+</button>
    <RoutesListFilter onOrderByClick= { onOrderByClick} onOrderDirClick= { onOrderDirClick} onQueryChange={onQueryChange} />
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalRoutes } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <RoutesCardList card={ card } routes={ routes } /> }
  </div>);

}

export default RoutesList;