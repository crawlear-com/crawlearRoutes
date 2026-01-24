import { createRoute, modifyRoute } from "../../../../database/routesCreationRpc";
import { CREATE_ACTION } from "../../../../helpers/utils";
import type { CreationRoute } from "../../../../types/Route.types";
import type { FormAction } from "../../store/slices/state.types";


const getActionFromRpcType = (actionType: FormAction) => {
  if (actionType === CREATE_ACTION) {
    return createRoute;
  }

  return modifyRoute;
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