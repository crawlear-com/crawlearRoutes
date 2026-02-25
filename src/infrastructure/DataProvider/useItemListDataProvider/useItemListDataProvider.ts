import type { AppDispatch } from "@/application/store/store";
import type { IItemListRespository } from "@/domain/IItemListRespository.types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useItemListDataProvider = <T>(repository: IItemListRespository<T>): [
  (page: number) => void, (order: string) => void, () => void, (query: string) => void,
  () => void, Array<T>, boolean, number, number, string, string, string ] => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(repository.selectMethods.selectItems);
  const isLoading = useSelector(repository.selectMethods.selectIsLoading);
  const currentPage = useSelector(repository.selectMethods.selectPage);
  const totalItems = useSelector(repository.selectMethods.selectTotalItems) || 0;
  const query = useSelector(repository.selectMethods.selectQuery);
  const orderBy = useSelector(repository.selectMethods.selectOrderBy);
  const orderDir = useSelector(repository.selectMethods.selectOrderDir);

  const pageChange = (page: number) => {
    dispatch(repository.setMethods.setPage(page));
    dispatch(repository.search());
  }
  const orderByChange = (order: string) => {
    dispatch(repository.setMethods.setOrderBy(order));
    dispatch(repository.search());
  }
  const orderDirChange = () => {
    dispatch(repository.setMethods.setOrderDir());
    dispatch(repository.search());
  }
  const queryChange = (query: string) => {
      dispatch(repository.setMethods.setQuery(query));
  };

  const search = React.useMemo(() => {
      return () => {
        dispatch(repository.setMethods.setPage(0));
        dispatch(repository.search());
      };
  }, [dispatch, repository]);

  return [pageChange, orderByChange, orderDirChange, queryChange, search,
    items, isLoading, currentPage, totalItems, query, orderBy, orderDir];
}

export { useItemListDataProvider };