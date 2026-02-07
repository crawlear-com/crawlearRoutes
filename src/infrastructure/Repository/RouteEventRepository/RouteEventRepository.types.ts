import type { RouteEvent } from "@/types/RouteEvent.types";
import type { ItemListDTO } from "../../DataProvider/RouteDataProvider/RouteDataProvider.types";
import type { GeoPoint, Route } from "@/types/Route.types";
import type { UserEventsStatisticsData } from "@/features/statistics/EventsStatistics/UserEventsStatistics.types";

interface IRouteEventRepository {
  getEventRouteEventsPaginated: (uid: string, page: number, orderBy: string, orderDir: string, query: string) => Promise<ItemListDTO<RouteEvent>>;
  getEventRoutesByMonth: (uid: string, startDate: string, endDate: string) => Promise<Array<Route>>;
  getEventRouteEventsByMonth: (uid: string, startDate: string, endDate: string) => Promise<Array<RouteEvent>>
  getRouteEventByIdAndOwner: (uid: string, eid: string) => Promise<RouteEvent>;
  getRouteEventById: (eid: string) => Promise<RouteEvent>;
  getTodayEvents: (uid: string) => Promise<Array<RouteEvent>>

  createEventRoute: (name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, owner: string) => Promise<string>
  modifyEventRoute: (name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, eid: string) => Promise<string>
  assignRouteToEvent: (eid: string, rid: string, owner: string) => void;
  deleteEventRoute: (eid: string) => void;
  setEventStartDate: (eid: string, startDate: string) => void;

  searchEventsByGeo: (searchBounds: L.LatLngBounds) => Promise<Array<RouteEvent>>;
  getUserEventsStats: (uid: string) => Promise<UserEventsStatisticsData>;
}

export type { IRouteEventRepository };