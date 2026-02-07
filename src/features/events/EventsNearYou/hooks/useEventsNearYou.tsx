import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import { getGeolocationPosition } from "@/features/maps/GpxRouteMap/helpers/mapUtils";
import type { RouteEvent } from "@/types/RouteEvent.types";
import L from "leaflet";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useEventsNearYou = (): [ boolean, Array<RouteEvent> ] => {
  const { t } = useTranslation("map");
  const [ location, setLocation ] = React.useState<GeolocationPosition | null>(null);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ routeEvents, setRouteEvents ] = React.useState<Array<RouteEvent>>([]);
  
  React.useEffect(() => {
    setIsLoading(true);

    getGeolocationPosition((data) => {
      setLocation(data);
      setIsLoading(false);
    }, () => {
      setIsLoading(false);
      toast.error(t("errors.error_-1"));
    });
  }, [t]);

  React.useEffect(() => {
    const repository = new SupabaseRouteEventRepository();
    const provider = new RouteEventDataProvider(repository);

    if (location) {
      setIsLoading(true);
      const lat = location?.coords.latitude;
      const lon = location?.coords.longitude;
      const southWest = new L.LatLng(lat - 0.5, lon - 0.5);
      const northEast = new L.LatLng(lat + 0.5, lon + 0.5);
      const bounds = new L.LatLngBounds(southWest, northEast);
      provider.searchEventsByGeo(bounds).then((data) => {
        setIsLoading(false);
        setRouteEvents(data);
      }).catch((e: unknown) => {
        setIsLoading(false);
        toast.error((e as Error).message);
      });
    }
  }, [location])

  return [ isLoading, routeEvents ];
}

export default useEventsNearYou;