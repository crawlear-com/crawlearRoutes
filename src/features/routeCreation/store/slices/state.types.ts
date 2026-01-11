import type { CreationRoute } from "../../../../types/Route.types";

interface CreationRouteState {
  route: CreationRoute
}

const initialState: CreationRouteState = {
  route: {
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
}

export { type CreationRouteState, initialState };