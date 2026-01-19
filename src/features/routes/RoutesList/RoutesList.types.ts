import type { Route } from "../../../types/Route.types";
import type { ActionCreatorWithPayload, AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";

type SetMethods = {
  setPage: ActionCreatorWithPayload<number, string>,
  setOrderBy: ActionCreatorWithPayload<string, string>,
  setOrderDir: ActionCreatorWithPayload<string, string>,
  setQuery: ActionCreatorWithPayload<string, string>
}

type SelectMethods = {
  selectRoutes: (state: unknown) => Array<Route>,
  selectIsLoading: (state: unknown) => boolean,
  selectPage: (state: unknown) => number,
  selectTotalRoutes: (state: unknown) => number
}

type RoutesListProps = {
  title?: string,
  card: (route: Route) => React.ReactElement,
  setMethods: SetMethods,
  selectMethods: SelectMethods,
  thunk: AsyncThunk<Array<Route>, void, AsyncThunkConfig>,
  hook: (thunk: AsyncThunk<Array<Route>, void, AsyncThunkConfig>,
  setMethods: SetMethods,
  selectMethods: SelectMethods) => [
      number, number, Array<Route>, boolean, (page: number) => void, 
      (order: string) => void, (order: string) => void, (query: string) => void, () => void
    ]
}

export type { RoutesListProps, SetMethods, SelectMethods };