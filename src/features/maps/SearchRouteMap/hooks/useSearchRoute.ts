import React from "react";
import type { GeoPoint, Route } from "../../../../types/Route.types";
import { searchRoutesByGeo, searchPublicRoutes } from "../../../../database/MyRoutesRpc";
import toast from "react-hot-toast";

type MapPoint = {
  point: GeoPoint,
  content: HTMLDivElement
}

const getPointsFromRoutes = (routes: Array<Route>) => {
  return routes.map((route: Route) => {
    const link = document.createElement('div')
    link.innerText = route.name

    return {
        point: route.location,
        content: link
    }
  })
}

const useSearchRoute = (): [ Array<Route>, Array<MapPoint>, boolean, 
  (searchBounds: L.LatLngBounds) => void, (query: string) => void ] => {

  const [ resultRoutes, setResultRoutes ] = React.useState<Array<Route>>([]);
  const [ points, setPoints ] = React.useState<Array<MapPoint>>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  const onQueryChange = (query: string) => {
    setIsLoading(true);
    searchPublicRoutes(query).then((routes) => {
      setResultRoutes(routes);
      setPoints(getPointsFromRoutes(routes) as Array<MapPoint>);
      setIsLoading(false);
    }).catch((e: unknown) => {
      toast.error((e as Error).message)
      setIsLoading(false);
    });
  }

  const onMapClick = React.useCallback((searchBounds: L.LatLngBounds) => {      
      setIsLoading(true);
      const getData = async () => {
        const promise = searchRoutesByGeo(searchBounds);

        promise.then((routes) => {
          setIsLoading(false);
          setResultRoutes(routes);
          if (routes && routes.length) {
            setPoints(getPointsFromRoutes(routes) as Array<MapPoint>);
          }
        }).catch((e: unknown) => {
          toast.error((e as Error).message)
          setIsLoading(false);
        });
      };

      getData();
  }, []);

  return [ resultRoutes, points, isLoading, onMapClick, onQueryChange ];
}

export default useSearchRoute;