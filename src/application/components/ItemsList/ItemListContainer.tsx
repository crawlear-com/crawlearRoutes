import type { ItemListRoutesContainerProps } from "./ItemListContainer.types";
import type { ItemListEventHandlers, ItemListStatus, ItemsListProps } from "@/application/components/ItemsList/ItemsList.types";
import { useItemListDataProvider } from "@/infrastructure/DataProvider/useItemListDataProvider/useItemListDataProvider";
import React from "react";

const ItemListContainer = <T, >({ children, repository }: ItemListRoutesContainerProps<T>) => {
  const [pageChange, orderByChange, orderDirChange, queryChange, search,
    items, isLoading, currentPage, totalItems, query, orderBy, orderDir] = useItemListDataProvider<T>(repository);
  const eventHandlers: ItemListEventHandlers = {
    onPageClick: (page: number) => pageChange(page),
    onOrderByClick: (order: string) => orderByChange(order),
    onOrderDirClick: () => orderDirChange(),
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
    { items: items, listStatus: listStatus, eventHandlers: eventHandlers });
}

export default ItemListContainer;