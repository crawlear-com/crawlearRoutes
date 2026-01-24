import type { GeoPoint } from "@/types/Route.types";

type MapPointContent = {
  name: string,
  rid: string,
  scale: number,
  difficulty: number
}

type MapPoint = {
  point: GeoPoint,
  content: MapPointContent
}

export type { MapPoint, MapPointContent };