import { useDispatch } from "react-redux";
import RouteCard from "../RouteCard/RouteCard";
import { deleteRouteAndLikes } from "../../../database/MyRoutesRpc";
import RoutesList from "../RoutesList/RoutesList";
import useRoutesProvider from "../hooks/useRoutesProvider";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { getMyRoutes } from "../store/slices/routeListsSlice";
import { setMyRoutesPage, setMyRoutesOrderBy, setMyRoutesOrderDir, setMyRoutesQuery, deleteMyRoutesRoute } from "../store/slices/routeListsSlice";
import { selectMyRoutes, selectMyRoutesIsLoading, selectMyRoutesPage, selectMyRoutesTotalRoutes } from "../store/selectors/routeListsSelectors";
import { useNavigate } from "react-router";

import type { Route } from "../../../types/Route.types";


const RoutesFromUser = () => {
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
      navigate(`/record/${rid}`);
    }
  }

  const deleteRouteById = (id: string) => {
    if (window.confirm(t("main.want delete route"))) {
      const promise = deleteRouteAndLikes(id);

      promise.then(() => {
        dispatch(deleteMyRoutesRoute(id));
        toast.success("Route removed");
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });
    }
  }
  const routeExtras = (rid: string) => <>
    <div className="absolute top-3 right-6 mr-5 text-xl leading-6" data-rid={ rid } onClick={ onModifyClick }>✎</div>
    <div className="absolute top-3 right-3" data-rid={ rid } onClick={ onDeleteClick }>🗑</div>
  </>
  const myRoutesCard = (route: Route) => <RouteCard key={ route.id } route={ route } extras={ routeExtras(route.id) } />;

  return <RoutesList title={ t("main.my routes") } card={ myRoutesCard }
    hook={ useRoutesProvider } thunk={ getMyRoutes } setPage={ setMyRoutesPage }
    setOrderBy={ setMyRoutesOrderBy } setOrderDir={ setMyRoutesOrderDir } setQuery={ setMyRoutesQuery}
    selectRoutes={ selectMyRoutes } selectIsLoading={ selectMyRoutesIsLoading }
    selectPage={ selectMyRoutesPage } selectTotalRoutes={ selectMyRoutesTotalRoutes }/>;
}

export default RoutesFromUser;