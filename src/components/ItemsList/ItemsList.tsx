import ItemCardList from "../ItemCardList/ItemCardList";
import ItemsPaginator from "../ItemCardList/ItemsPaginator";
import ItemsListFilter from "../ItemCardList/ItemsListFilter";
import Spinner from "../ui/Spinner/Spinner";
import type { ItemsListProps } from "./ItemsList.types";

const ItemsList = <T,>({ title, card, hook, thunk, setMethods, selectMethods }: ItemsListProps<T>) => {
  const [ currentPage, totalItems, items, isLoading, onPageClick, onOrderByClick, 
    onOrderDirClick, onQueryChange, onSearch ] = hook(thunk, setMethods, selectMethods);

  return (<div className="w-full lg:w-[50%]">
    { title ? <h1 className="mr-3 inline-block">{ title }</h1> : <></>}
    <ItemsListFilter onOrderByClick= { onOrderByClick } onOrderDirClick= { onOrderDirClick }
      onQueryChange={ onQueryChange } onSearch={ onSearch }/>
    <ItemsPaginator currentPage = { currentPage } totalItems = { totalItems } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <ItemCardList<T> card={ card } items={ items } /> }
  </div>);
}

export default ItemsList;