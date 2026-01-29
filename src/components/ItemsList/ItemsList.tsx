import ItemCardList from "@/components/ItemCardList/ItemCardList";
import ItemsPaginator from "@/components/ItemCardList/ItemsPaginator";
import ItemsListFilter from "@/components/ItemCardList/ItemsListFilter";
import Spinner from "@/components/ui/Spinner/Spinner";
import useItemsList from "./hooks/useItemsList";
import type { ItemsListProps } from "./ItemsList.types";

const ItemsList = <T,>({ title, card, getDataAsyncThunk, setMethods, selectMethods }: ItemsListProps<T>) => {
  const [ currentPage, query, orderBy, orderDir, totalItems, items, isLoading, onPageClick,
    onOrderByClick, onOrderDirClick, onQueryChange, onSearch ] = useItemsList<T>(getDataAsyncThunk, setMethods, selectMethods);

  return (<div className="">
    { title ? <h1 className="mr-3 inline-block mb-4">{ title }</h1> : <></>}
    <ItemsListFilter query={query} orderBy={ orderBy } orderDir={ orderDir }
      onOrderByClick= { onOrderByClick } onOrderDirClick= { onOrderDirClick }
      onQueryChange={ onQueryChange } onSearch={ onSearch }/>
    <ItemsPaginator currentPage = { currentPage } totalItems = { totalItems } onPageClick={ onPageClick } />
    { isLoading ? <Spinner /> : <ItemCardList<T> card={ card } items={ items } /> }
  </div>);
}

export default ItemsList;