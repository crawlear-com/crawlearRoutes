import type { CreationRoute, GeoPoint, Route } from "../../../../types/Route.types";

const UPDATE_ACTION = 'update';
const CREATE_ACTION = 'create';
type RouteAction = 'create' | 'update' | null;

type ActionPayload = {
  routeId: string | null,
  name: string,
  description: string,
  isPublic: boolean,
  difficulty: number,
  location: GeoPoint,
  scale: number,
  youtubeVideo: string,
  gpx: string,
  distance: number,
  durationTime: number,
  owner: string
}

type CreateAction = (payload: ActionPayload) => Promise<Route>
type UpdateAction = (payload: ActionPayload) => Promise<Route>

type CreationRouteState = {
  routeId: string | null,
  action: RouteAction,
  route: CreationRoute,
  isLoading: boolean,
  error: string | null
}

const initialState: CreationRouteState = {
  routeId: null,
  action: null,
  isLoading: false,
  error: null,
  route: {
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
}

export type { CreationRouteState, CreateAction, UpdateAction, ActionPayload, RouteAction };
export { initialState, CREATE_ACTION, UPDATE_ACTION };