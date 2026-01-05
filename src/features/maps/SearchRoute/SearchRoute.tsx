import * as React from "react";
import MapPointPicker from "../MapPointPicker/MapPointPicker";
import { getRoutesInView } from "../../../database/MyRoutesRpc";
import type { GeoPoint, Route } from "../../../types/Route.types";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";

type MapPoint = {
  point: GeoPoint,
  content: HTMLDivElement
}

const SearchRoute = () => {
  const [ resultRoutes, setResultRoutes ] = React.useState<Array<Route>>([]);
  const [ points, setPoints ] = React.useState<Array<MapPoint>>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  const onMapClick = React.useCallback((latlon: L.LatLng, mapBounds: L.LatLngBounds) => {
      setIsLoading(true);
      const getData = async () => {
        const nEast = mapBounds.getNorthEast();
        const sWest = mapBounds.getSouthWest();
        const promise = getRoutesInView(nEast.lat, nEast.lng, sWest.lat, sWest.lng);

        promise.then((routes) => {
          setIsLoading(false);
          if (routes && routes.length) {
            setResultRoutes(routes);
            setPoints(routes.map((route: Route) => {
              const link = document.createElement('div')
              link.innerText = route.name

              return {
                  point: route.location,
                  content: link
              }
            }));
          }
        }).catch((e: unknown) => {
          toast.error((e as Error).message)
          setIsLoading(false);
        });
      };

      getData();
  }, []);

  return (<div className="w-full sm:w-[50%]">
    <MapPointPicker onMapClick={ onMapClick } points={ points } className="w-full h-96 sm:h-full"></MapPointPicker>
    <label htmlFor="searchRouteInput" className="mt-56">
      Search route:
      <input className="border-primary border h-10 p-2 ml-2 rounded" id="searchRouteInput" type="text" placeholder="by title or description..." />
    </label>
    { isLoading ? <Spinner /> : <></>}
    { resultRoutes && resultRoutes.length ? <>Total: { resultRoutes.length }</> : <></>}
  </div>);
}

export default SearchRoute;