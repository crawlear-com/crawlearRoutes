import { CREATE_ACTION } from "@/helpers/utils";
import type { CreationRoute } from "@/domain/Route.types";
import type RouteDataProvider from "@/infrastructure/DataProvider/RouteDataProvider/RouteDataProvider";

const getActionFromRpcType = (actionType: string, provider: RouteDataProvider) => {
  if (actionType === CREATE_ACTION) {
    return provider.createRoute.bind(provider);
  }

  return provider.modifyRoute.bind(provider);
}

const createActionPayload = (rid: string | null, route: CreationRoute, owner: string) => {
  return {
    rid: rid,
    name: route.name,
    description: route.description,
    isPublic: route.isPublic,
    difficulty: route.difficulty,
    location: route.location,
    scale: route.scale,
    youtubeVideo: route.youtubeVideo,
    gpx: route.gpx,
    distance: route.distance,
    durationTime: route.durationTime,
    owner: owner
  }
}

export { getActionFromRpcType, createActionPayload };