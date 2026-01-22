import RoutesCardList from "../ItemCardList/ItemCardList";
import RoutesPaginator from "../ItemCardList/ItemsPaginator";
import RoutesListFilter from "../ItemCardList/ItemsListFilter";
import Spinner from "../Spinner/Spinner";
import type { ItemsListProps } from "./ItemsList.types";

const ItemsList = <T,>({ title, card, hook, thunk, setMethods, selectMethods }: ItemsListProps<T>) => {
  const [ currentPage, totalItems, items, isLoading, onPageClick, onOrderByClick, 
    onOrderDirClick, onQueryChange, onSearch ] = hook(thunk, setMethods, selectMethods);

  return (<div className="w-full lg:w-[50%]">
    { title ? <h1 className="mr-3 inline-block">{ title }</h1> : <></>}
    <RoutesListFilter onOrderByClick= { onOrderByClick } onOrderDirClick= { onOrderDirClick }
      onQueryChange={ onQueryChange } onSearch={ onSearch }/>
    <RoutesPaginator currentPage = { currentPage } totalItems = { totalItems } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <RoutesCardList card={ card } items={ items } /> }
  </div>);
}

export default ItemsList;