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

const selectRouteSearchQuery = createSelector(
  (state) => state.routeSearch,
  (routeSearch) => routeSearch.query
);

const selectRouteSearchPage = createSelector(
  (state) => state.routeSearch,
  (routeSearch) => routeSearch.page
);

const selectRouteSearchTotalPages = createSelector(
  (state) => state.routeSearch,
  (routeSearch) => routeSearch.totalRoutes
);

export { selectRouteSearchIsLoading, selectRouteSearchPoints, selectRouteSearchRoutes,
  selectRouteSearchQuery, selectRouteSearchPage, selectRouteSearchTotalPages };