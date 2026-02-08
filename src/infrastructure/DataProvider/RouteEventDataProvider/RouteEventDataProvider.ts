import type { IRouteEventDataProvider } from "./RouteEventDataProvider.types";
import type { IRouteEventRepository } from "../../../domain/RouteEventRepository.types";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import type { GeoPoint, Route } from "@/domain/Route.types";
import type { UserEventsStatisticsData } from "@/application/features/statistics/EventsStatistics/UserEventsStatistics.types";
import type { ItemListDTO } from "@/infrastructure/ItemListDTO.types";

class RouteEventDataProvider implements IRouteEventDataProvider {
  private repository: IRouteEventRepository;

  constructor(repository: IRouteEventRepository) {
    this.repository = repository;
  }

  async getEventRouteEventsPaginated(uid: string, page: number, orderBy: string, orderDir: string, query: string): Promise<ItemListDTO<RouteEvent>> {
    return await this.repository.getEventRouteEventsPaginated(uid, page, orderBy, orderDir, query);
  }

  async getEventRoutesByMonth(uid: string, startDate: string, endDate: string): Promise<Array<Route>> {
    return await this.repository.getEventRoutesByMonth(uid, startDate, endDate);
  }

  async getEventRouteEventsByMonth(uid: string, startDate: string, endDate: string): Promise<Array<RouteEvent>> {
    return await this.repository.getEventRouteEventsByMonth(uid, startDate, endDate);
  }

  async getRouteEventByIdAndOwner(uid: string, eid: string) {
    return await this.repository.getRouteEventByIdAndOwner(uid, eid);
  }

  async getRouteEventById(eid: string) {
    return await this.repository.getRouteEventById(eid);
  }

  async assignRouteToEvent(eid: string, rid: string, owner: string) {
    return await this.repository.assignRouteToEvent(eid, rid, owner);
  }

  async deleteEventRoute(eid: string) {
    return await this.repository.deleteEventRoute(eid);
  }

  async getTodayEvents(uid: string) {
    return await this.repository.getTodayEvents(uid);
  }

  async setEventStartDate(eid: string, startDate: string) {
    return await this.repository.setEventStartDate(eid, startDate);
  }

  async createEventRoute(name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, owner: string) {
    return await this.repository.createEventRoute(name, description, location, date, scale, rid, owner);
  }

  async modifyEventRoute(name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, eid: string) {
    return await this.repository.modifyEventRoute(name, description, location, date, scale, rid, eid);
  }

  async searchEventsByGeo(searchBounds: L.LatLngBounds):Promise<Array<RouteEvent>> {
    return await this.repository.searchEventsByGeo(searchBounds);
  }

  async getUserEventsStats(uid: string): Promise<UserEventsStatisticsData> {
    return await this.repository.getUserEventsStats(uid);
  }
}

export type { IRouteEventDataProvider };
export default RouteEventDataProvider;
