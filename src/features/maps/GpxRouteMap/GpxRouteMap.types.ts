import type { GeoPoint } from "@/types/Route.types"

type GpxRouteMapProps = {
  gpx?: string
  className?: string,
  onFileResolved?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void,
  onRouteRecorded?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void
}

type GpxInfo = {
  distance: number,
  time: number,
  movingTime: number,
  speed: number,
  elevationMin: number,
  elevationMax: number,
  elevationData?: Array<Array<number>>
}

export type { GpxRouteMapProps, GpxInfo };