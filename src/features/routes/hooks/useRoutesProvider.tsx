import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import type { SelectMethods, SetMethods } from '@/components/ItemsList/ItemsList.types';
import type { Route } from '@/types/Route.types';

const useRoutesProvider = (thunk: AsyncThunk<Array<Route>, void, AsyncThunkConfig>,
  setMethods: SetMethods,
  selectMethods: SelectMethods<Route>): 
  [ number, number, Array<Route>, boolean, (page: number) => void, (order: string) =>  void,
    (order: string) =>  void, (query: string) =>  void, () =>  void ] => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useSelector(selectMethods.selectItems);
  const isLoading = useSelector(selectMethods.selectIsLoading);
  const currentPage = useSelector(selectMethods.selectPage);
  const totalRoutes = useSelector(selectMethods.selectTotalItems);

  const onPageClick = (page: number) => {
    dispatch(setMethods.setPage(page));
    dispatch(thunk());
  }
  const onOrderByClick = (order: string) => {
    dispatch(setMethods.setOrderBy(order));
    dispatch(thunk());
  }
  const onOrderDirClick = (order: string) => {
    dispatch(setMethods.setOrderDir(order));
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

  return [ currentPage, totalRoutes, routes, isLoading, onPageClick,
    onOrderByClick, onOrderDirClick, onQueryChange, onSearch ];
}

export default useRoutesProvider;