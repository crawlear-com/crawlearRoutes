import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import { deleteLike } from "@/database/routeRpc";
import { deleteMyFavoritesRoute, setMyFavouritesOrderBy, setMyFavouritesOrderDir,
  setMyFavouritesPage, setMyFavouritesQuery } from "../../store/slices/routeListsSlice";
import toast from "react-hot-toast";
import type { Route } from "@/types/Route.types";
import RouteCard from "@/features/routes/RouteCard/RouteCard";
import { selectMyFavorites, selectMyFavoritesIsLoading, selectMyFavoritesOrderBy, selectMyFavoritesOrderDir, selectMyFavoritesPage,
  selectMyFavoritesQuery,
  selectMyFavoritesTotalRoutes } from "@/features/routes/store/selectors/routeListsSelectors";
import type { SelectMethods, SetMethods } from "@/components/ItemsList/ItemsList.types";

const useLikesFromUser = (): [ (route: Route) => React.JSX.Element,
  SetMethods, SelectMethods<Route> ] => {
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
  const setMethods = {
    setPage: setMyFavouritesPage,
    setOrderBy: setMyFavouritesOrderBy,
    setOrderDir: setMyFavouritesOrderDir,
    setQuery: setMyFavouritesQuery
  };
  const selectMethods: SelectMethods<Route> = {
    selectItems: selectMyFavorites,
    selectIsLoading: selectMyFavoritesIsLoading,
    selectPage: selectMyFavoritesPage,
    selectTotalItems: selectMyFavoritesTotalRoutes,
    selectOrderBy: selectMyFavoritesOrderBy,
    selectOrderDir: selectMyFavoritesOrderDir,
    selectQuery: selectMyFavoritesQuery
  };

  return [ myRoutesCard, setMethods, selectMethods ]
}

export default useLikesFromUser;