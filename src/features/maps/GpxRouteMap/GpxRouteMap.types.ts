import type { GeoPoint } from "@/types/Route.types"

type GpxRouteMapProps = {
  gpx?: string
  mapClassName?: string,
  containerClassName?: string,
  onFileResolved?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void,
  onRouteRecorded?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void,
  onStopRecording?: () => void,
  onStartRecording?: () => void
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