import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/application/store/store';
import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import type { SelectMethods, SetMethods } from '@/application/components/ItemsList/ItemsList.types';
import type { ItemListDTO } from '@/infrastructure/ItemListDTO.types';

const useItemsList = <T, > (
  thunk: AsyncThunk<ItemListDTO<T>, void, AsyncThunkConfig>,
  setMethods: SetMethods,
  selectMethods: SelectMethods<T>): 
    [ number, string, string, string, number, Array<T>, boolean, (page: number) => void, (order: string) =>  void,
      () =>  void, (query: string) =>  void, () =>  void ] => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useSelector(selectMethods.selectItems);
  const isLoading = useSelector(selectMethods.selectIsLoading);
  const currentPage = useSelector(selectMethods.selectPage);
  const totalItems = useSelector(selectMethods.selectTotalItems) || 0;
  const query = useSelector(selectMethods.selectQuery);
  const orderBy = useSelector(selectMethods.selectOrderBy);
  const orderDir = useSelector(selectMethods.selectOrderDir);

  const onPageClick = (page: number) => {
    dispatch(setMethods.setPage(page));
    dispatch(thunk());
  }
  const onOrderByClick = (order: string) => {
    dispatch(setMethods.setOrderBy(order));
    dispatch(thunk());
  }
  const onOrderDirClick = () => {
    dispatch(setMethods.setOrderDir());
    dispatch(thunk());
  }
  const onQueryChange = (query: string) => {
      dispatch(setMethods.setQuery(query));
  };

  const onSearch = () => {
      dispatch(thunk());
  }

  React.useEffect(() => {
    dispatch(thunk());
  }, [dispatch, thunk]);

  return [ currentPage, query, orderBy, orderDir, totalItems, routes, isLoading, onPageClick,
    onOrderByClick, onOrderDirClick, onQueryChange, onSearch ];
}

export default useItemsList;