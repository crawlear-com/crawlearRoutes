import type { Route } from "@/domain/Route.types";
import type { IItemListRespository } from "@/domain/IItemListRespository.types";
import { getMyFavourites, setMyFavouritesOrderBy, setMyFavouritesOrderDir, setMyFavouritesPage, setMyFavouritesQuery } from "@/application/features/routes/store/slices/routeListsSlice";
import { selectMyFavorites, selectMyFavoritesIsLoading, selectMyFavoritesOrderBy, selectMyFavoritesOrderDir, selectMyFavoritesPage, selectMyFavoritesQuery, selectMyFavoritesTotalRoutes } from "@/application/features/routes/store/selectors/routeListsSelectors";

const ItemListFavoriteRoutesReduxRespository: IItemListRespository<Route> = {
  search: getMyFavourites,
  setMethods: {
    setPage: setMyFavouritesPage,
    setOrderBy: setMyFavouritesOrderBy,
    setOrderDir: setMyFavouritesOrderDir,
    setQuery: setMyFavouritesQuery
  },
  selectMethods: {
    selectItems: selectMyFavorites,
    selectIsLoading: selectMyFavoritesIsLoading,
    selectPage: selectMyFavoritesPage,
    selectTotalItems: selectMyFavoritesTotalRoutes,
    selectOrderBy: selectMyFavoritesOrderBy,
    selectOrderDir: selectMyFavoritesOrderDir,
    selectQuery: selectMyFavoritesQuery
  }
}

export default ItemListFavoriteRoutesReduxRespository;