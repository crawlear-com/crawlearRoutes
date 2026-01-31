import type { GeoPoint } from "./Route.types";

type RouteEvent = {
  id: string,
  name: string,
  description: string,
  location: GeoPoint | null,
  date: string,
  scale: number,
  rid: string | null,
  owner: string,
  routeName?: string
}

export type { RouteEvent };