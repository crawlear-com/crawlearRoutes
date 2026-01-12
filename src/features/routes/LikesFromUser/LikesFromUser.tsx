import { useTranslation } from "react-i18next";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../hooks/useRoutesProvider";
import { deleteMyFavoritesRoute, getMyFavourites } from "../store/slices/routeListsSlice";
import { setMyFavouritesPage, setMyFavouritesOrderBy, setMyFavouritesOrderDir, setMyFavouritesQuery } from "../store/slices/routeListsSlice";
import { selectMyFavorites, selectMyFavoritesIsLoading, selectMyFavoritesPage, selectMyFavoritesTotalRoutes } from "../store/selectors/routeListsSelectors";
import { deleteLike } from "../../../database/MyRoutesRpc";

import type { Route } from "../../../types/Route.types";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectUserUUID } from "../../users/store/selectors/userSelectors";


const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const dispatch = useDispatch();
  const uid = useSelector(selectUserUUID);
  const deleteFavoriteById = (uid: string, rid: string) => {
    const promise = deleteLike(uid, rid);

    promise.then(() => {
      dispatch(deleteMyFavoritesRoute(rid));
      toast.success("Like removed");
    }).catch((e: unknown) => {
      toast.error((e as Error).message);
    });
  }

  const deleteExtras = (uid: string, rid: string) => <div onClick={() => deleteFavoriteById(uid, rid)}>♥</div>
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } extras={ deleteExtras(uid, route.id) } />;

  return <RoutesList title={ t("main.favourite routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyFavourites } setPage={ setMyFavouritesPage}
    setOrderBy={ setMyFavouritesOrderBy } setOrderDir={ setMyFavouritesOrderDir } setQuery={ setMyFavouritesQuery }
    selectRoutes={ selectMyFavorites } selectIsLoading={ selectMyFavoritesIsLoading }
    selectPage={ selectMyFavoritesPage } selectTotalRoutes={ selectMyFavoritesTotalRoutes }/>;
}

export default LikesFromUser;