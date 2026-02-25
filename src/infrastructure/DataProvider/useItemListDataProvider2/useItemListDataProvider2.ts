import React from "react";
import toast from "react-hot-toast";
import type { ItemListDTO } from "@/infrastructure/ItemListDTO.types";

const useItemListDataProvider2 = <T>(owner: string, getItems: (owner: string, currentPage: number, orderBy: string, orderDir: string, query: string) => Promise<ItemListDTO<T>>): [
  (page: number) => void, (order: string) => void, (direction: string) => void, (query: string) => void,
  () => void, ItemListDTO<T>, boolean, number, number, string, string, string ] => {
  const [ items, setItems ] = React.useState<ItemListDTO<T>>({ data: [], total_count: 0 });
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const [ currentPage, setCurrentPage ] = React.useState<number>(0);
  const [ totalItems, setTotalItems ] = React.useState<number>(0);
  const [ query, setQuery ] = React.useState<string>("");
  const [ orderBy, setOrderBy ] = React.useState<string>("");
  const [ orderDir, setOrderDir ] = React.useState<string>("asc");

    const search = React.useMemo(() => {
      return () => getItems(owner!, currentPage, orderBy, orderDir, query).then((items) => {
        setIsLoading(false);
        setTotalItems(items.total_count);
        setItems(items as ItemListDTO<T>);
      }).catch((e: unknown) => {
        setIsLoading(false);
        toast.error((e as Error).message);
      }); 
    }, [currentPage, orderBy, orderDir, query, getItems, owner]);

  const pageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    search();
  }
  const orderByChange = (order: string) => {
    setOrderBy(order);
    setCurrentPage(0);
    setIsLoading(true);
    search();
  }
  const orderDirChange = (direction: string) => {
    setOrderDir(direction);
    setCurrentPage(0);
    setIsLoading(true);
    search();
  }
  const queryChange = (query: string) => {
      setQuery(query);
      setCurrentPage(0);
      setIsLoading(true);
  };

  return [pageChange, orderByChange, orderDirChange, queryChange, search,
    items, isLoading, currentPage, totalItems, query, orderBy, orderDir];
}

export { useItemListDataProvider2 };