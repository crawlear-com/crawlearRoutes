import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUUID } from "@/application/features/users/store/selectors/userSelectors";
import { deleteMyFavoritesRoute } from "../../store/slices/routeListsSlice";
import toast from "react-hot-toast";
import type { Route } from "@/domain/Route.types";
import RouteCard from "@/application/features/routes/RouteCard/RouteCard";
import SupabaseRouteRepository from "@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository";
import RouteDataProvider from "@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider";

const useLikesFromUser = (): [ (route: Route) => React.JSX.Element ] => {
  const { t } = useTranslation(['myRoutes']);
  const dispatch = useDispatch();
  const uid = useSelector(selectUserUUID);
  const repository = React.useMemo(() => new SupabaseRouteRepository(), []);
  const provider = React.useMemo(() => new RouteDataProvider(repository), [repository]);

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
      const promise = provider.deleteLikeRoute(uid, rid);

      promise.then(() => {
        dispatch(deleteMyFavoritesRoute(rid));
        toast.success(t("main.like removed"));
      }).catch(() => {
        toast.error(t("errors.like not removed"));
      });
    }
  }

  const likeExtras = (uid: string, rid: string) => <div data-uuid={ uid } data-rid={ rid }
    className="absolute top-3 right-3" onClick={ onDeleteClick }>♥️</div>
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } extras={ likeExtras(uid, route.id) } />;

  return [ myRoutesCard ]
}

export default useLikesFromUser;