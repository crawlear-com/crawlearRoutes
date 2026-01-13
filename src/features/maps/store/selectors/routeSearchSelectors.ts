import { createSelector } from "@reduxjs/toolkit";

const selectRouteSearchRoutes = createSelector(
  (state) => state.routeSearch,
  (routeSearch) => routeSearch.routes
);

const selectRouteSearchPoints = createSelector(
  (state) => state.routeSearch,
  (routeSearch) => routeSearch.points
);

const selectRouteSearchIsLoading = createSelector(
  (state) => state.routeSearch,
  (routeSearch) => routeSearch.isLoading
);

const selectQuery = createSelector(
  (state) => state.routeSearch,
  (routeSearch) => routeSearch.query
);

export { selectRouteSearchIsLoading, selectRouteSearchPoints, selectRouteSearchRoutes,
  selectQuery };