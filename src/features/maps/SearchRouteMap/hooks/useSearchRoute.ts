import React from "react";
import type { Route } from "../../../../types/Route.types";
import type { MapPoint } from "../SearchRouteMap.types";
import { selectRouteSearchIsLoading, selectRouteSearchPoints, selectRouteSearchRoutes } from "../../store/selectors/routeSearchSelectors";
import { searchByGeo, searchByQuery, setRouteSearchPage, setRouteSearchQuery } from "../../store/slices/routeSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { deleteLike, likeRoute } from "../../../../database/routeRpc";
import toast from "react-hot-toast";

const useSearchRoute = (): [ Array<Route>, Array<MapPoint>, boolean, 
  (searchBounds: L.LatLngBounds) => void, (query: string) => void,
  () => void, (page: number) => void, (event: React.MouseEvent<HTMLDivElement>) => void ] => {
  const resultRoutes = useSelector(selectRouteSearchRoutes);
  const points = useSelector(selectRouteSearchPoints);
  const isLoading = useSelector(selectRouteSearchIsLoading);
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

  const onLikeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as HTMLDivElement;
    const isLiked = element.dataset.isliked === "true";
    const uid = element.dataset.uid;
    const rid = element.dataset.rid;

    event.stopPropagation();

    if (uid && rid) {
      if (isLiked) {
        deleteLike(uid, rid).then(()=> {
          element.innerText = "♡";
          element.dataset.isliked = "false";
          toast.success("Like removed");
        }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });
      } else {
        likeRoute(uid, rid).then(() => {
          element.innerText = "♥️";
          element.dataset.isliked = "true";
          toast.success("Like created");
        }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });
      }
    }
  }

  return [ resultRoutes, points, isLoading, onMapClick, onQueryChange, onSearch, onPageClick, onLikeClick ];
}

export default useSearchRoute;