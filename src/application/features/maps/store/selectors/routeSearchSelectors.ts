import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/application/store/store";

const selectRouteSearchRoutes = createSelector(
  (state: RootState) => state.routeSearch,
  (routeSearch) => routeSearch.routes
);

const selectRouteSearchPoints = createSelector(
  (state: RootState) => state.routeSearch,
  (routeSearch) => routeSearch.points
);

const selectRouteSearchIsLoading = createSelector(
  (state: RootState) => state.routeSearch,
  (routeSearch) => routeSearch.isLoading
);

const selectRouteSearchQuery = createSelector(
  (state: RootState) => state.routeSearch,
  (routeSearch) => routeSearch.query
);

const selectRouteSearchPage = createSelector(
  (state: RootState) => state.routeSearch,
  (routeSearch) => routeSearch.page
);

const selectRouteSearchTotalPages = createSelector(
  (state: RootState) => state.routeSearch,
  (routeSearch) => routeSearch.totalRoutes
);

export { selectRouteSearchIsLoading, selectRouteSearchPoints, selectRouteSearchRoutes,
  selectRouteSearchQuery, selectRouteSearchPage, selectRouteSearchTotalPages };