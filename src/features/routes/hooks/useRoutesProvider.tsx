import * as React from 'react';
import type { Route } from '../../../types/Route.types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import type { ActionCreatorWithPayload, AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit';

const useRoutesProvider = (thunk: AsyncThunk<Array<Route>, void, AsyncThunkConfig>,
  setPage: ActionCreatorWithPayload<number, string>,
  setOrderBy: ActionCreatorWithPayload<string, string>,
  setOrderDir: ActionCreatorWithPayload<string, string>,
  setQuery: ActionCreatorWithPayload<string, string>,
  selectRoutes: (state: unknown) => Array<Route>,
  selectIsLoading: (state: unknown) => boolean,
  selectPage: (state: unknown) => number,
  selectTotalRoutes: (state: unknown) => number,
): 
  [ number, number, Array<Route>, boolean, (page: number) => void, (order: string) =>  void,
    (order: string) =>  void, (query: string) =>  void, (query: string) =>  void ] => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useSelector(selectRoutes);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = useSelector(selectPage);
  const totalRoutes = useSelector(selectTotalRoutes);

  const onPageClick = (page: number) => {
    dispatch(setPage(page));
    dispatch(thunk());
  }
  const onOrderByClick = (order: string) => {
    dispatch(setOrderBy(order));
    dispatch(thunk());
  }
  const onOrderDirClick = (order: string) => {
    dispatch(setOrderDir(order));
    dispatch(thunk());
  }
  const onQueryChange = (query: string) => {
      dispatch(setQuery(query));
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