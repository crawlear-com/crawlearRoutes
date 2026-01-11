import RoutesCardList from "../RoutesCardList/RoutesCardList";
import RoutesPaginator from "../RoutesCardList/RoutesPaginator";
import RoutesListFilter from "../RoutesCardList/RoutesListFilter";
import Spinner from "../../../components/Spinner/Spinner";
import type { RoutesListProps } from "./RoutesList.types";

const RoutesList = ({ title, card, hook, thunk, setPage, setOrderBy, setOrderDir, setQuery, selectIsLoading, selectPage, selectRoutes, selectTotalRoutes }: RoutesListProps) => {
  const [ currentPage, totalRoutes, routes, isLoading, onPageClick, onOrderByClick, 
    onOrderDirClick, onQueryChange ] = hook(thunk, setPage, setOrderBy, setOrderDir, setQuery, selectRoutes, selectIsLoading, selectPage, selectTotalRoutes);

  return (<div className="w-full lg:w-[50%]">
    { title ? <h1 className="mr-3 inline-block">{ title }</h1> : <></>}
    <RoutesListFilter onOrderByClick= { onOrderByClick} onOrderDirClick= { onOrderDirClick} onQueryChange={onQueryChange} />
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalRoutes } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <RoutesCardList card={ card } routes={ routes } /> }
  </div>);
}

export default RoutesList;