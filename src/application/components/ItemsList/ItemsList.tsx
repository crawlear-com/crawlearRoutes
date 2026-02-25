import ItemListPaginator from "@/application/components/ItemsList/ItemListPaginator/ItemListPaginator";
import ItemsListFilter from "@/application/components/ItemsList/ItemListFilter/ItemsListFilter";
import Spinner from "@/application/components/ui/Spinner/Spinner";
import type { ItemsListProps } from "./ItemsList.types";
import ItemCardList from "./ItemCardList/ItemCardList";

const ItemsList = <T,>(props: ItemsListProps<T>) => {
  const { children, card, items, listStatus, eventHandlers } = props;

  if (!items || !listStatus || !eventHandlers) {
    return null;
  }
  return (<>
    { children }
    <ItemsListFilter query={ listStatus.query } orderBy={ listStatus.orderBy } orderDir={ listStatus.orderDir }
      onOrderByClick= { eventHandlers.onOrderByClick } onOrderDirClick= { eventHandlers.onOrderDirClick }
      onQueryChange={ eventHandlers.onQueryChange } onSearch={ eventHandlers.onSearch }/>
    <ItemListPaginator currentPage = { listStatus.currentPage } totalItems = { listStatus.totalItems } onPageClick={ eventHandlers.onPageClick } />
    { listStatus.isLoading ? <Spinner /> : <ItemCardList<T> card={ card } items={ items } /> }
  </>);
}

export default ItemsList;