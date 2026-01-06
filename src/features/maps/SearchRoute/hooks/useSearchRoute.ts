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
  (latlon: L.LatLng, mapBounds: L.LatLngBounds) => void, (query: string) => void ] => {

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

  const onMapClick = React.useCallback((latlon: L.LatLng, mapBounds: L.LatLngBounds) => {
    const southWest = mapBounds.getSouthWest();
    const northEast = mapBounds.getNorthEast();

      const latLength = Math.abs(northEast.lat - southWest.lat) / 2
      const lonLength = Math.abs(northEast.lng - southWest.lng) / 4
      
      setIsLoading(true);
      const getData = async () => {
        //where('point.lat', '>', latlon.lat - bounds.lat), where('point.lat', '<', latlon.lat + bounds.lat)
        const promise = searchRoutesByGeo(latlon.lat - latLength,
          latlon.lng - lonLength, latlon.lat + latLength, latlon.lng + lonLength);

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