import React from "react";
import type { GeoPoint, Route } from "../../../../types/Route.types";
import { searchRoutesByGeo, searchPublicRoutes } from "../../../../database/MyRoutesRpc";
import toast from "react-hot-toast";

type MapPoint = {
  point: GeoPoint,
  content: HTMLDivElement
}

const LAT_MODIFIER = 0.35;
const LON_MODIFIER = 0.45;

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
  (latlon: L.LatLng) => void, (query: string) => void ] => {

  const [ resultRoutes, setResultRoutes ] = React.useState<Array<Route>>([]);
  const [ points, setPoints ] = React.useState<Array<MapPoint>>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  const onQueryChange = (query: string) => {
    setIsLoading(true);
    searchPublicRoutes(query).then((routes) => {
      setResultRoutes(routes);
      setPoints(getPointsFromRoutes(routes));
      setIsLoading(false);
    }).catch((e: unknown) => {
      toast.error((e as Error).message)
      setIsLoading(false);
    });
  }

  const onMapClick = React.useCallback((latlon: L.LatLng) => {
      setIsLoading(true);
      const getData = async () => {
        const promise = searchRoutesByGeo(latlon.lat - LAT_MODIFIER,
          latlon.lng - LON_MODIFIER, latlon.lat + LAT_MODIFIER, latlon.lng + LON_MODIFIER);

        promise.then((routes) => {
          setIsLoading(false);
          if (routes && routes.length) {
            setResultRoutes(routes);
            setPoints(getPointsFromRoutes(routes));
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