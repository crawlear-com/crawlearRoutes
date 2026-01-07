import type { GpxData } from "../../../../types/Gpx.types";
import type { GeoPoint } from "../../../../types/Route.types";


interface RouteState {
  gpx: GpxData | null,
  quadrant: GeoPoint | null
}

const initialState: RouteState = {
  gpx: null,
  quadrant: null
}

export { type RouteState, initialState };