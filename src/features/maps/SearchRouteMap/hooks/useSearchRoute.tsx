import React from "react";
import { LatLng, LatLngBounds } from "leaflet";
import type { Route, SearchResultRoute } from "@/domain/Route.types";
import type { MapPoint } from "../SearchRouteMap.types";
import { selectRouteSearchIsLoading, selectRouteSearchPage, selectRouteSearchPoints,
  selectRouteSearchQuery, selectRouteSearchRoutes, selectRouteSearchTotalPages } from "@/features/maps/store/selectors/routeSearchSelectors";
import { searchByGeo, searchByQuery, setRouteSearchPage, setRouteSearchQuery } from "@/features/maps/store/slices/routeSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import useLikeRoute from "./useLikeRoute";
import RouteCard from "@/features/routes/RouteCard/RouteCard";

const useSearchRoute = (): [ Array<Route>, Array<MapPoint>, boolean, 
  string, number, number, (searchBounds: LatLngBounds | LatLng) => void,
  (query: string) => void, () => void, (page: number) => void,
  (route: Route | SearchResultRoute) => React.JSX.Element ] => {
  const [likeExtras ] = useLikeRoute();
  const resultRoutes = useSelector(selectRouteSearchRoutes);
  const points = useSelector(selectRouteSearchPoints);
  const isLoading = useSelector(selectRouteSearchIsLoading);
  const query = useSelector(selectRouteSearchQuery);
  const page = useSelector(selectRouteSearchPage);
  const totalRoutes = useSelector(selectRouteSearchTotalPages) || 0;
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

  const onMapClick = React.useCallback((searchBounds: LatLngBounds | LatLng) => {      
    if (searchBounds instanceof LatLngBounds) {
      dispatch(searchByGeo(searchBounds));
    }
  }, [dispatch]);


  return [ resultRoutes, points, isLoading, query, page, totalRoutes, 
    onMapClick, onQueryChange, onSearch, onPageClick, routesCard ];
}

export default useSearchRoute;