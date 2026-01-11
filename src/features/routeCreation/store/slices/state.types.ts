import type { GeoPoint } from "../../../../types/Route.types";


interface RouteState {
  gpx: string | null,
  point: GeoPoint | null,
  name: string,
  description: string,
  difficulty: number,
  scale: number,
  youtubeVideo: string,
  distance: number,
  duration: number,
  isPublic: boolean
}

const initialState: RouteState = {
  gpx: null,
  point: null,
  name: "",
  description: "",
  difficulty: 1,
  scale: 1,
  youtubeVideo: "",
  distance: 0,
  duration: 0,
  isPublic: true
}

export { type RouteState, initialState };