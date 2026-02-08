import type { MapPoint } from "@/application/features/maps/SearchRouteMap/SearchRouteMap.types";
import { CREATE_ACTION } from "@/application/helpers/utils";
import type { GeoPoint } from "@/domain/Route.types";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import type RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const getActionFromActionRpcType = (actionType: string, provider: RouteEventDataProvider) => {
  if (actionType === CREATE_ACTION) {
    return provider.createEventRoute.bind(provider);
  }

  return provider.modifyEventRoute.bind(provider);
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

const getHourString = (date: string) => {
  const dateObject = new Date(date);
  const hoursValue = dateObject.getHours().toString().padStart(2, '0');
  const minutesValue = dateObject.getMinutes() === 0 ? '00h' : '30h';

  return `${hoursValue}:${minutesValue}`;
}

const createActionPayload = (routeEvent: RouteEvent & { hour: string }) => {
  const newDate = new Date(routeEvent.date);
  
  newDate.setHours(routeEvent.hour ? Number(routeEvent.hour.split(':')[0]) : 0);
  newDate.setMinutes(routeEvent.hour ? Number(routeEvent.hour.split(':')[1].replace('h', '')) : 0);
    return {
      id: routeEvent.id || null,
      name: routeEvent.name,
      description: routeEvent.description,
      location: routeEvent.location,
      date: newDate,
      scale: routeEvent.scale,
      rid: routeEvent.rid,
      owner: routeEvent.owner
    }
}

export { getActionFromActionRpcType, createMapPointFromGeoPoint, getHourString, createActionPayload };