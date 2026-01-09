import type { GeoPoint } from "../../../types/Route.types"

type GpxRouteMapProps = {
  gpx?: string
  className?: string,
  onFileResolved?: (fileContent: string, routePoint: GeoPoint) => void,
  onRouteRecorded?: (fileContent: string, routePoint: GeoPoint) => void
}

type GpxInfo = {
  distance: number,
  time: number,
  movingTime: number,
  speed: number,
  elevationMin: number,
  elevationMax: number
}

export type { GpxRouteMapProps, GpxInfo };