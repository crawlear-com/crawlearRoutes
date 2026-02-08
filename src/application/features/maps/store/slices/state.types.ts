import type { Route } from "@/domain/Route.types";
import type { MapPoint } from "@/application/features/maps/SearchRouteMap/SearchRouteMap.types";

type RouteSearchState = {
  query: string,
  page: number,
  routes: Array<Route>,
  points: Array<MapPoint>
  isLoading: boolean,
  error: string | null,
  totalRoutes: number
}

const RoutesSearchInitialState: RouteSearchState = {
  query: "",
  page: 0,
  routes: [],
  points: [],
  isLoading: false,
  error: null,
  totalRoutes: 0
};

export { type RouteSearchState, RoutesSearchInitialState };