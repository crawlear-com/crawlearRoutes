import React from "react";
import type { Route } from "../../../../types/Route.types";
import type { MapPoint } from "../SearchRouteMap.types";
import { selectRouteSearchIsLoading, selectRouteSearchPage, selectRouteSearchPoints, selectRouteSearchQuery, selectRouteSearchRoutes, selectRouteSearchTotalPages } from "../../store/selectors/routeSearchSelectors";
import { searchByGeo, searchByQuery, setRouteSearchPage, setRouteSearchQuery } from "../../store/slices/routeSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { selectUserUUID } from "../../../users/store/selectors/userSelectors";

const useSearchRoute = (): [ Array<Route>, Array<MapPoint>, boolean, 
  string, number, number, string, (searchBounds: L.LatLngBounds) => void,
  (query: string) => void, () => void, (page: number) => void ] => {
  const resultRoutes = useSelector(selectRouteSearchRoutes);
  const points = useSelector(selectRouteSearchPoints);
  const isLoading = useSelector(selectRouteSearchIsLoading);
  const query = useSelector(selectRouteSearchQuery);
  const page = useSelector(selectRouteSearchPage);
  const totalRoutes = useSelector(selectRouteSearchTotalPages);
  const uid = useSelector(selectUserUUID);
  const dispatch = useDispatch<AppDispatch>();

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


  return [ resultRoutes, points, isLoading, query, page, totalRoutes, uid, 
    onMapClick, onQueryChange, onSearch, onPageClick ];
}

export default useSearchRoute;