import type { ItemListRoutesContainerProps2 } from "./ItemListContainer2.types";
import type { ItemListEventHandlers, ItemListStatus, ItemsListProps } from "@/application/components/ItemsList/ItemsList.types";
import { useItemListDataProvider2 } from "@/infrastructure/DataProvider/useItemListDataProvider2/useItemListDataProvider2";
import React from "react";

const ItemListContainer2 = <T, >({ children, owner, getItems }: ItemListRoutesContainerProps2<T>) => {
  const [pageChange, orderByChange, orderDirChange, queryChange, search,
    items, isLoading, currentPage, totalItems, query, orderBy, orderDir] = useItemListDataProvider2<T>(owner, getItems);
  const eventHandlers: ItemListEventHandlers = {
    onPageClick: (page: number) => pageChange(page),
    onOrderByClick: (order: string) => orderByChange(order),
    onOrderDirClick: (dir: string) => orderDirChange(dir),
    onQueryChange: (query: string) => queryChange(query),
    onSearch: () => search()
  }

  const listStatus: ItemListStatus = {
    isLoading: isLoading,
    currentPage: currentPage,
    totalItems: totalItems,
    query: query,
    orderBy: orderBy,
    orderDir: orderDir
  }

  React.useEffect(() => {
    search();
  }, [search]);

  return React.cloneElement(children as React.ReactElement<ItemsListProps<T>>, 
    { items: items.data, listStatus: listStatus, eventHandlers: eventHandlers });
}

export default ItemListContainer2;