import type { GeoPoint } from "../../../../types/Route.types"

function getMin(p1: GeoPoint, p2: GeoPoint) {
  if(p1.lat < p2.lat) {
    p2.lat = p1.lat
  }
  if (p1.lon < p2.lon) {
    p2.lon = p1.lon
  }
  return p2
}

function getMax(p1: GeoPoint, p2: GeoPoint) {
  if(p1.lat > p2.lat) {
    p2.lat = p1.lat
  }
  if(p1.lon > p2.lon) {
    p2.lon = p1.lon
  }
  return p2
}

export { getMin, getMax };