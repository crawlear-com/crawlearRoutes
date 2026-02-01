import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteRouteAndLikes } from "@/database/MyRoutesRpc";
import { deleteMyRoutesRoute, setMyRoutesOrderBy, setMyRoutesOrderDir, setMyRoutesPage, setMyRoutesQuery } from "../../store/slices/routeListsSlice";
import toast from "react-hot-toast";
import type { Route } from "@/types/Route.types";
import RouteCard from "@/features/routes/RouteCard/RouteCard";
import { selectMyRoutes, selectMyRoutesIsLoading, selectMyRoutesOrderBy, selectMyRoutesOrderDir, selectMyRoutesPage, selectMyRoutesQuery, selectMyRoutesTotalRoutes } from "../../store/selectors/routeListsSelectors";
import React from "react";
import type { SelectMethods, SetMethods } from "@/components/ItemsList/ItemsList.types";

const useRoutesFromUser = (): [ (route: Route) => React.JSX.Element,
  SetMethods, SelectMethods<Route> ] => {
  const { t } = useTranslation(['myRoutes']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const rid = element.dataset.rid;

    event.stopPropagation();
    if (rid) {
      deleteRouteById(rid);
    }
  }
  const onModifyClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const rid = element.dataset.rid;

    event.stopPropagation();
    if (rid) {
      navigate(`/route/${rid}`);
    }
  }

  const deleteRouteById = (id: string) => {
    if (window.confirm(t("main.want delete route"))) {
      const promise = deleteRouteAndLikes(id);

      promise.then(() => {
        dispatch(deleteMyRoutesRoute(id));
        toast.success(t("main.route deleted"));
      }).catch(() => {
        toast.error(t("errors.not removed"));
      });
    }
  }
  const routeExtras = (rid: string) => <>
    <div className="absolute top-3 right-6 mr-5 text-xl leading-6" data-rid={ rid } onClick={ onModifyClick }>✎</div>
    <div className="absolute top-3 right-3" data-rid={ rid } onClick={ onDeleteClick }>🗑</div>
  </>
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } extras={ routeExtras(route.id) } />;
  const setMethods: SetMethods = {
    setPage: setMyRoutesPage,
    setOrderBy: setMyRoutesOrderBy,
    setOrderDir: setMyRoutesOrderDir,
    setQuery: setMyRoutesQuery
  };
  const selectMethods: SelectMethods<Route> = {
    selectItems: selectMyRoutes,
    selectIsLoading: selectMyRoutesIsLoading,
    selectPage: selectMyRoutesPage,
    selectTotalItems: selectMyRoutesTotalRoutes,
    selectOrderBy: selectMyRoutesOrderBy,
    selectOrderDir: selectMyRoutesOrderDir,
    selectQuery: selectMyRoutesQuery,
  };

  return [ myRoutesCard, setMethods, selectMethods ];
}

export default useRoutesFromUser;