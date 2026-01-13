import type { Route } from "../../../types/Route.types";
import type { ActionCreatorWithPayload, AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";

type RoutesListProps = {
  title?: string,
  card: (route: Route) => React.ReactElement,
  setPage: ActionCreatorWithPayload<number, string>,
  setOrderBy: ActionCreatorWithPayload<string, string>,
  setOrderDir: ActionCreatorWithPayload<string, string>,
  setQuery: ActionCreatorWithPayload<string, string>,
  selectRoutes: (state: unknown) => Array<Route>,
  selectIsLoading: (state: unknown) => boolean,
  selectPage: (state: unknown) => number,
  selectTotalRoutes: (state: unknown) => number,
  thunk: AsyncThunk<Array<Route>, void, AsyncThunkConfig>,
  hook: (thunk: AsyncThunk<Array<Route>, void, AsyncThunkConfig>,
    setPage: ActionCreatorWithPayload<number, string>,
    setOrderBy: ActionCreatorWithPayload<string, string>,
    setOrderDir: ActionCreatorWithPayload<string, string>,
    setQuery: ActionCreatorWithPayload<string, string>,
    selectRoutes: (state: unknown) => Array<Route>,
    selectIsLoading: (state: unknown) => boolean,
    selectPage: (state: unknown) => number,
    selectTotalRoutes: (state: unknown) => number) => [
      number, number, Array<Route>, boolean, (page: number) => void, 
      (order: string) => void, (order: string) => void, (query: string) => void, (query: string) => void
    ]
}

export type { RoutesListProps };