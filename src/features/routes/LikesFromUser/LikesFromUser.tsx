import { useTranslation } from "react-i18next";
import RouteCard from "../RouteCard/RouteCard";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../hooks/useRoutesProvider";
import { deleteMyFavoritesRoute, getMyFavourites } from "../store/slices/routeListsSlice";
import { setMyFavouritesPage, setMyFavouritesOrderBy, setMyFavouritesOrderDir, setMyFavouritesQuery } from "../store/slices/routeListsSlice";
import { selectMyFavorites, selectMyFavoritesIsLoading, selectMyFavoritesPage, selectMyFavoritesTotalRoutes } from "../store/selectors/routeListsSelectors";
import { deleteLike } from "../../../database/routeRpc";

import type { Route } from "../../../types/Route.types";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectUserUUID } from "../../users/store/selectors/userSelectors";


const LikesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const dispatch = useDispatch();
  const uid = useSelector(selectUserUUID);
  const onDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const uid = element.dataset.uuid;
    const rid = element.dataset.rid;

    event.stopPropagation();
    if (uid && rid) {
      deleteFavoriteById(uid, rid);
    }
  }
  const deleteFavoriteById = (uid: string, rid: string) => {
    if (window.confirm(t("main.want delete favorite"))) {
      const promise = deleteLike(uid, rid);

      promise.then(() => {
        dispatch(deleteMyFavoritesRoute(rid));
        toast.success("Like removed");
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });
    }
  }

  const likeExtras = (uid: string, rid: string) => <div data-uuid={ uid } data-rid={ rid }
    className="absolute top-3 right-3" onClick={ onDeleteClick }>♥️</div>
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } extras={ likeExtras(uid, route.id) } />;

  return <RoutesList title={ t("main.favourite routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyFavourites } setPage={ setMyFavouritesPage}
    setOrderBy={ setMyFavouritesOrderBy } setOrderDir={ setMyFavouritesOrderDir } setQuery={ setMyFavouritesQuery }
    selectRoutes={ selectMyFavorites } selectIsLoading={ selectMyFavoritesIsLoading }
    selectPage={ selectMyFavoritesPage } selectTotalRoutes={ selectMyFavoritesTotalRoutes }/>;
}

export default LikesFromUser;