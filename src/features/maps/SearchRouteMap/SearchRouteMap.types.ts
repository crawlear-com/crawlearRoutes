import type { GeoPoint } from "../../../types/Route.types";

type MapPointContent = {
  name: string,
  rid: string
}

type MapPoint = {
  point: GeoPoint,
  content: MapPointContent
}

export type { MapPoint, MapPointContent };