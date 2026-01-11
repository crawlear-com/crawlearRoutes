import RoutesCardList from "../RoutesCardList/RoutesCardList";
import RoutesPaginator from "../RoutesCardList/RoutesPaginator";
import RoutesListFilter from "../RoutesCardList/RoutesListFilter";
import Spinner from "../../../components/Spinner/Spinner";
import type { RoutesListProps } from "./RoutesList.types";

const RoutesList = ({ title, card, hook, rpc}: RoutesListProps) => {
  const [ currentPage, totalRoutes, routes, isLoading, onPageClick, onOrderByClick, 
    onOrderDirClick, onQueryChange ] = hook(rpc);

  return (<div className="w-full lg:w-[50%]">
    { title ? <h1 className="mr-3 inline-block">{ title }</h1> : <></>}
    <RoutesListFilter onOrderByClick= { onOrderByClick} onOrderDirClick= { onOrderDirClick} onQueryChange={onQueryChange} />
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalRoutes } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <RoutesCardList card={ card } routes={ routes } /> }
  </div>);
}

export default RoutesList;