import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/application/store/store';
import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';
import type { SelectMethods, SetMethods } from '@/application/components/ItemsList/ItemsList.types';
import type { Route } from '@/domain/Route.types';

const useRoutesProvider = (thunk: AsyncThunk<Array<Route>, void, AsyncThunkConfig>,
  setMethods: SetMethods,
  selectMethods: SelectMethods<Route>): 
  [ number, string, string, string, number, Array<Route>, boolean, (page: number) => void, (order: string) =>  void,
    () =>  void, (query: string) =>  void, () =>  void ] => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useSelector(selectMethods.selectItems);
  const isLoading = useSelector(selectMethods.selectIsLoading);
  const currentPage = useSelector(selectMethods.selectPage);
  const totalRoutes = useSelector(selectMethods.selectTotalItems);
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

  return [ currentPage, query, orderBy, orderDir, totalRoutes, routes, isLoading, onPageClick,
    onOrderByClick, onOrderDirClick, onQueryChange, onSearch ];
}

export default useRoutesProvider;