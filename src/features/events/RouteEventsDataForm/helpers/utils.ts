import type { MapPoint } from "@/features/maps/SearchRouteMap/SearchRouteMap.types";
import { CREATE_ACTION } from "@/helpers/utils";
import type { FormAction } from "@/types/Generic.types";
import type { GeoPoint } from "@/types/Route.types";
import type RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const getActionFromActionRpcType = (actionType: FormAction, provider: RouteEventDataProvider) => {
  if (actionType === CREATE_ACTION) {
    return provider.createEventRoute;
  }

  return provider.modifyEventRoute;
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