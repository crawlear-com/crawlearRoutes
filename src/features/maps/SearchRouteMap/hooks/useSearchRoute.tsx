import React from "react";
import type { Route, SearchResultRoute } from "../../../../types/Route.types";
import type { MapPoint } from "../SearchRouteMap.types";
import { selectRouteSearchIsLoading, selectRouteSearchPage, selectRouteSearchPoints, selectRouteSearchQuery, selectRouteSearchRoutes, selectRouteSearchTotalPages } from "../../store/selectors/routeSearchSelectors";
import { searchByGeo, searchByQuery, setRouteSearchPage, setRouteSearchQuery } from "../../store/slices/routeSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { selectUserUUID } from "../../../users/store/selectors/userSelectors";
import useLikeRoute from "./useLikeRoute";
import RouteCard from "../../../routes/RouteCard/RouteCard";

const useSearchRoute = (): [ Array<Route>, Array<MapPoint>, boolean, 
  string, number, number, (searchBounds: L.LatLngBounds) => void,
  (query: string) => void, () => void, (page: number) => void,
  (route: Route | SearchResultRoute) => React.JSX.Element ] => {
  const [likeExtras ] = useLikeRoute();
  const resultRoutes = useSelector(selectRouteSearchRoutes);
  const points = useSelector(selectRouteSearchPoints);
  const isLoading = useSelector(selectRouteSearchIsLoading);
  const query = useSelector(selectRouteSearchQuery);
  const page = useSelector(selectRouteSearchPage);
  const totalRoutes = useSelector(selectRouteSearchTotalPages);
  const uid = useSelector(selectUserUUID);
  const dispatch = useDispatch<AppDispatch>();

  const routesCard = (route: Route | SearchResultRoute) => 
    <RouteCard key={ route.id } route={ route } 
      extras={ likeExtras(uid, route.id, (route as SearchResultRoute).liked) } />;

  const onQueryChange = (query: string) => {
    dispatch(setRouteSearchQuery(query));
  }

  const onSearch = () => {
    dispatch(searchByQuery());
  }

  const onPageClick = (page: number) => {
    dispatch(setRouteSearchPage(page));
    dispatch(searchByQuery());
  }

  const onMapClick = React.useCallback((searchBounds: L.LatLngBounds) => {      
    dispatch(searchByGeo(searchBounds));
  }, [dispatch]);


  return [ resultRoutes, points, isLoading, query, page, totalRoutes, 
    onMapClick, onQueryChange, onSearch, onPageClick, routesCard ];
}

export default useSearchRoute;