import L from "leaflet"
import type { GeoPoint } from "../../../../types/Route.types"

const getMin = (p1: GeoPoint, p2: GeoPoint) => {
  if(p1.lat < p2.lat) {
    p2.lat = p1.lat
  }
  if (p1.lon < p2.lon) {
    p2.lon = p1.lon
  }
  return p2
}

const getMax = (p1: GeoPoint, p2: GeoPoint) => {
  if(p1.lat > p2.lat) {
    p2.lat = p1.lat
  }
  if(p1.lon > p2.lon) {
    p2.lon = p1.lon
  }
  return p2
}

const getSearchBoundsFromPoint = (point: L.LatLng, mapBounds: L.LatLngBounds): L.LatLngBounds => {
  const north = mapBounds.getNorth();
  const south = mapBounds.getSouth();
  const west = mapBounds.getWest();
  const east = mapBounds.getEast();

  const latModifier = (north - south) / 3;
  const lngModifier = (east - west) / 3;
  const southWest = [point.lat - latModifier, point.lng - lngModifier] as L.LatLngTuple;
  const northEast = [point.lat + latModifier, point.lng + lngModifier] as L.LatLngTuple;
  
  return new L.LatLngBounds(southWest, northEast);
} 

export { getMin, getMax, getSearchBoundsFromPoint };