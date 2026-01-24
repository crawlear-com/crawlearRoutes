import type { FormAction } from "@/types/Generic.types";
import type { CreationRoute, GeoPoint, Route } from "@/types/Route.types";

type ActionPayload = {
  rid: string | null,
  name: string,
  description: string,
  isPublic: boolean,
  difficulty: number,
  location: GeoPoint,
  scale: number,
  youtubeVideo: string | null,
  gpx: string | null,
  distance: number,
  durationTime: number,
  owner: string
}

type CreateAction = (payload: ActionPayload) => Promise<Route>
type UpdateAction = (payload: ActionPayload) => Promise<Route>

type CreationRouteState = {
  rid: string | null,
  eventId: string | null,
  action: FormAction,
  route: CreationRoute,
  isLoading: boolean,
  error: string | null
}

const routeInitialState = {
    name: "",
    description: "",
    difficulty: 1,
    isPublic: true,
    likes: 0,
    location: { lat: 0, lon: 0},
    scale: 1,
    youtubeVideo: "",
    gpx: null,
    durationTime: 0,
    distance: 0
}

const initialState: CreationRouteState = {
  rid: null,
  eventId: null,
  action: null,
  isLoading: false,
  error: null,
  route: routeInitialState
}

export type { CreationRouteState, CreateAction, UpdateAction, ActionPayload, FormAction };
export { initialState };