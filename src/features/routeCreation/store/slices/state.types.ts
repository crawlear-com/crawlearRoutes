import { CREATE_ACTION } from "@/helpers/utils";
import type { CreationRoute, GeoPoint, Route } from "@/domain/Route.types";

type ActionPayload = {
  rid: string | null,
  name: string,
  description: string,
  isPublic: boolean,
  difficulty: number,
  location: GeoPoint | null,
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
  action: string,
  route: CreationRoute,
  isLoading: boolean,
  isRecording: boolean,
  error: string | null
  
}

const routeInitialState = {
    name: "",
    description: "",
    difficulty: 1,
    isPublic: true,
    likes: 0,
    location: null,
    scale: 1,
    youtubeVideo: "",
    gpx: null,
    durationTime: 0,
    distance: 0
}

const initialState: CreationRouteState = {
  rid: null,
  eventId: null,
  action: CREATE_ACTION,
  isLoading: false,
  isRecording: false,
  error: null,
  route: routeInitialState
}

export type { CreationRouteState, CreateAction, UpdateAction, ActionPayload };
export { initialState };