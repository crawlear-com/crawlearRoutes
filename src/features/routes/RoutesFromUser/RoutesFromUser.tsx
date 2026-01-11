import { useDispatch } from "react-redux";
import RouteCard from "../RouteCard/RouteCard";
import { deleteRoute } from "../../../database/MyRoutesRpc";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { getMyRoutes } from "../store/slices/routeListsSlice";
import { setMyRoutesPage, setMyRoutesOrderBy, setMyRoutesOrderDir, setMyRoutesQuery, deleteMyRoutesRoute } from "../store/slices/routeListsSlice";
import { selectMyRoutes, selectMyRoutesIsLoading, selectMyRoutesPage, selectMyRoutesTotalRoutes } from "../store/selectors/routeListsSelectors";

import type { Route } from "../../../types/Route.types";


const RoutesFromUser = () => {
  const { t } = useTranslation(['myRoutes']);
  const dispatch = useDispatch();
  const deleteRouteById = (id: string) => {
    const promise = deleteRoute(id);

    promise.then(() => {
      dispatch(deleteMyRoutesRoute(id));
      toast.success("Route removed");
    }).catch((e: unknown) => {
      toast.error((e as Error).message);
    });
  }
  const deleteExtras = (id: string) => <div onClick={() => deleteRouteById(id)}>🗑</div>
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } extras={ deleteExtras(route.id) } />;

  return <RoutesList title={ t("main.my routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyRoutes } setPage={ setMyRoutesPage }
    setOrderBy={ setMyRoutesOrderBy } setOrderDir={ setMyRoutesOrderDir } setQuery={ setMyRoutesQuery}
    selectRoutes={ selectMyRoutes } selectIsLoading={ selectMyRoutesIsLoading }
    selectPage={ selectMyRoutesPage } selectTotalRoutes={ selectMyRoutesTotalRoutes }/>;
}

export default RoutesFromUser;