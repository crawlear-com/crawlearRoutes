import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

const selectMyRoutes = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myRoutes.routes
);

const selectMyRoutesIsLoading = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myRoutes.isLoading
);

const selectMyRoutesPage = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myRoutes.page
);

const selectMyRoutesOrderBy = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myRoutes.orderBy
);

const selectMyRoutesOrderDir = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myRoutes.orderDir
);

const selectMyRoutesQuery = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myRoutes.query
);

const selectMyRoutesTotalRoutes = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myRoutes.totalRoutes
);

const selectMyFavorites = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myFavorites.routes
);

const selectMyFavoritesIsLoading = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myFavorites.isLoading
);

const selectMyFavoritesPage = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myFavorites.page
);

const selectMyFavoritesOrderBy = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myFavorites.orderBy
);

const selectMyFavoritesOrderDir = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myFavorites.orderDir
);

const selectMyFavoritesQuery = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myFavorites.query
);

const selectMyFavoritesTotalRoutes = createSelector(
  (state: RootState) => state.routes,
  (routes) => routes.myFavorites.totalRoutes
);

export { selectMyRoutes, selectMyRoutesIsLoading, selectMyRoutesPage, selectMyRoutesOrderBy, selectMyRoutesOrderDir, selectMyRoutesQuery, selectMyRoutesTotalRoutes,
  selectMyFavorites, selectMyFavoritesIsLoading, selectMyFavoritesPage, selectMyFavoritesOrderBy, selectMyFavoritesOrderDir, selectMyFavoritesQuery, selectMyFavoritesTotalRoutes
 };