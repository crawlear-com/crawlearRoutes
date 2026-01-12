import { createSelector } from "@reduxjs/toolkit";

const selectMyRoutes = createSelector(
  (state) => state.routes,
  (routes) => routes.myRoutes.routes
);

const selectMyRoutesIsLoading = createSelector(
  (state) => state.routes,
  (routes) => routes.myRoutes.isLoading
);

const selectMyRoutesPage = createSelector(
  (state) => state.routes,
  (routes) => routes.myRoutes.page
);

const selectMyRoutesOrderBy = createSelector(
  (state) => state.routes,
  (routes) => routes.myRoutes.orderBy
);

const selectMyRoutesOrderDir = createSelector(
  (state) => state.routes,
  (routes) => routes.myRoutes.orderDir
);

const selectMyRoutesQuery = createSelector(
  (state) => state.routes,
  (routes) => routes.myRoutes.query
);

const selectMyRoutesTotalRoutes = createSelector(
  (state) => state.routes,
  (routes) => routes.myRoutes.totalRoutes
);

const selectMyFavorites = createSelector(
  (state) => state.routes,
  (routes) => routes.myFavorites.routes
);

const selectMyFavoritesIsLoading = createSelector(
  (state) => state.routes,
  (routes) => routes.myFavorites.isLoading
);

const selectMyFavoritesPage = createSelector(
  (state) => state.routes,
  (routes) => routes.myFavorites.page
);

const selectMyFavoritesOrderBy = createSelector(
  (state) => state.routes,
  (routes) => routes.myFavorites.orderBy
);

const selectMyFavoritesOrderDir = createSelector(
  (state) => state.routes,
  (routes) => routes.myFavorites.orderDir
);

const selectMyFavoritesQuery = createSelector(
  (state) => state.routes,
  (routes) => routes.myFavorites.query
);

const selectMyFavoritesTotalRoutes = createSelector(
  (state) => state.routes,
  (routes) => routes.myFavorites.totalRoutes
);

export { selectMyRoutes, selectMyRoutesIsLoading, selectMyRoutesPage, selectMyRoutesOrderBy, selectMyRoutesOrderDir, selectMyRoutesQuery, selectMyRoutesTotalRoutes,
  selectMyFavorites, selectMyFavoritesIsLoading, selectMyFavoritesPage, selectMyFavoritesOrderBy, selectMyFavoritesOrderDir, selectMyFavoritesQuery, selectMyFavoritesTotalRoutes
 };