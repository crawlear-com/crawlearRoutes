import { createEventRoute, modifyEventRoute } from "@/database/eventsCreationRpc";
import type { MapPoint } from "@/features/maps/SearchRouteMap/SearchRouteMap.types";
import { CREATE_ACTION } from "@/helpers/utils";
import type { FormAction } from "@/types/Generic.types";
import type { GeoPoint } from "@/types/Route.types";

const getActionFromActionRpcType = (actionType: FormAction) => {
  if (actionType === CREATE_ACTION) {
    return createEventRoute;
  }

  return modifyEventRoute;
}

const createMapPointFromGeoPoint = (point: GeoPoint, pointName: string) => {
  return {
    point: point,
    content: {
      name: pointName,
      rid: "",
      scale: 0,
      difficulty: 0
    }
  } as MapPoint;
}

export { getActionFromActionRpcType, createMapPointFromGeoPoint };