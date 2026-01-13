import React from "react";
import type { Route } from "../../../../types/Route.types";
import type { MapPoint } from "../SearchRouteMap.types";
import { selectRouteSearchIsLoading, selectRouteSearchPoints, selectRouteSearchRoutes } from "../../store/selectors/routeSearchSelectors";
import { searchByGeo, searchByQuery, setQuery } from "../../store/slices/routeSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";

const useSearchRoute = (): [ Array<Route>, Array<MapPoint>, boolean, 
  (searchBounds: L.LatLngBounds) => void, (query: string) => void,
  (query: string) => void ] => {
  const resultRoutes = useSelector(selectRouteSearchRoutes);
  const points = useSelector(selectRouteSearchPoints);
  const isLoading = useSelector(selectRouteSearchIsLoading);
  const dispatch = useDispatch<AppDispatch>();

  const onQueryChange = (query: string) => {
    dispatch(setQuery(query));
  }

  const onSearch = (query: string) => {
    dispatch(searchByQuery(query));
  }

  const onMapClick = React.useCallback((searchBounds: L.LatLngBounds) => {      
    dispatch(searchByGeo(searchBounds));
  }, [dispatch]);

  return [ resultRoutes, points, isLoading, onMapClick, onQueryChange, onSearch ];
}

export default useSearchRoute;