import type { GeoPoint } from "../../../types/Route.types";

type MapPointContent = {
  name: string,
  rid: string
}

type MapPoint = {
  point: GeoPoint,
  type: number
  content: MapPointContent
}

export type { MapPoint, MapPointContent };