import type { GeoPoint } from "../../../../types/Route.types";


interface RouteState {
  gpx: string | null,
  quadrant: GeoPoint | null
}

const initialState: RouteState = {
  gpx: null,
  quadrant: null
}

export { type RouteState, initialState };