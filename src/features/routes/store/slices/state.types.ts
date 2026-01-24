import type { Route } from "@/types/Route.types";

type RoutesListState = {
  routes: Array<Route>,
  page: number,
  orderBy: string,
  orderDir: string,
  query: string,
  isLoading: boolean,
  error: string | null,
  totalRoutes: number
}

type RouteListsState = {
  myRoutes: RoutesListState,
  myFavorites: RoutesListState
}

const routesListInitialState = {
  routes: [],
  page: 0,
  orderBy: 'name',
  orderDir: 'asc',
  query: '',
  isLoading: false,
  error: null,
  totalRoutes: 0
};

const initialState: RouteListsState = {
  myRoutes: routesListInitialState,
  myFavorites: routesListInitialState
}

export { type RouteListsState, initialState };