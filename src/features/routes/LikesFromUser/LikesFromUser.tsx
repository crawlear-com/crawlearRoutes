import { useTranslation } from "react-i18next";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../../../database/hooks/useRoutesProvider";
import { getMyFavourites } from "../store/slices/routeListsSlice";
import { setMyFavouritesPage, setMyFavouritesOrderBy, setMyFavouritesOrderDir, setMyFavouritesQuery } from "../store/slices/routeListsSlice";
import { selectMyFavorites, selectMyFavoritesIsLoading, selectMyFavoritesPage, selectMyFavoritesTotalRoutes } from "../store/selectors/routeListsSelectors";

import type { Route } from "../../../types/Route.types";


const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);

  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } />;

  return <RoutesList title={ t("main.favourite routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyFavourites } setPage={ setMyFavouritesPage}
    setOrderBy={ setMyFavouritesOrderBy } setOrderDir={ setMyFavouritesOrderDir } setQuery={ setMyFavouritesQuery }
    selectRoutes={ selectMyFavorites } selectIsLoading={ selectMyFavoritesIsLoading }
    selectPage={ selectMyFavoritesPage } selectTotalRoutes={ selectMyFavoritesTotalRoutes }/>;
}

export default LikesFromUser;