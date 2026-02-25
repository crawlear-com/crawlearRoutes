import type { Route } from "@/domain/Route.types";
import type { IItemListRespository } from "@/domain/IItemListRespository.types";
import { getMyRoutes, setMyRoutesOrderBy, setMyRoutesOrderDir, setMyRoutesPage, setMyRoutesQuery } from "@/application/features/routes/store/slices/routeListsSlice";
import { selectMyRoutes, selectMyRoutesIsLoading, selectMyRoutesOrderBy, selectMyRoutesOrderDir, selectMyRoutesPage, selectMyRoutesQuery, selectMyRoutesTotalRoutes } from "@/application/features/routes/store/selectors/routeListsSelectors";

const ItemListRoutesReduxRespository: IItemListRespository<Route> = {
  search: getMyRoutes,
  setMethods: {
    setPage: setMyRoutesPage,
    setOrderBy: setMyRoutesOrderBy,
    setOrderDir: setMyRoutesOrderDir,
    setQuery: setMyRoutesQuery
  },
  selectMethods: {
    selectItems: selectMyRoutes,
    selectIsLoading: selectMyRoutesIsLoading,
    selectPage: selectMyRoutesPage,
    selectTotalItems: selectMyRoutesTotalRoutes,
    selectOrderBy: selectMyRoutesOrderBy,
    selectOrderDir: selectMyRoutesOrderDir,
    selectQuery: selectMyRoutesQuery,
  }
}

export default ItemListRoutesReduxRespository;