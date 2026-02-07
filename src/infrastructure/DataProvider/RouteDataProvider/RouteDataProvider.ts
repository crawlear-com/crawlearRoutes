//import type { ActionPayload } from "@/features/routeCreation/store/slices/state.types";
import type { Route } from "@/domain/Route.types";
import type { IRouteDataProvider } from "./RouteDataProvider.types";
import type { IRouteRepository } from "../../../domain/RouteRepository.types";
import type { ActionPayload } from "@/features/routeCreation/store/slices/state.types";
import type { ItemListDTO } from "@/infrastructure/ItemListDTO.types";

class RouteDataProvider implements IRouteDataProvider {
  private repository: IRouteRepository;

  constructor(repository: IRouteRepository) {
    this.repository = repository;
  }

  async getRoute(rid: string): Promise<Route> {
    return await this.repository.getRoute(rid);
  }

  async getMyRoutesPaginated(uuid: string, page: number, orderBy: string, orderDir: string, query: string):Promise<ItemListDTO<Route>> {
    return await this.repository.getMyRoutesPaginated(uuid, page, orderBy, orderDir, query);
  }

  async getMyRoutesFull(uid: string): Promise<Array<Route>> {
    return await this.repository.getMyRoutesFull(uid);
  }

  async getLikesFromUserPaginated(uid: string, page: number, orderBy: string, orderDir: string, query: string):Promise<ItemListDTO<Route>> {
    return await this.repository.getLikesFromUserPaginated(uid, page, orderBy, orderDir, query);
  }

  async deleteRoute(rid: string) {
    return await this.repository.deleteRoute(rid);
  }

  async likeRoute (uid: string, rid: string) {
    return await this.repository.likeRoute(uid, rid);
  }

  async deleteLikeRoute(uid: string, rid: string) {
    return await this.repository.deleteLikeRoute(uid, rid);
  }

  async createRoute(payload: ActionPayload) {
    return await this.repository.createRoute(payload);
  }

  async modifyRoute(payload: ActionPayload) {
    return await this.repository.modifyRoute(payload);
  }

  async searchRoutesByGeo(searchBounds: L.LatLngBounds) {
    return await this.repository.searchRoutesByGeo(searchBounds);
  }

  async searchPublicRoutes(query: string, page: number, userId: string) {
    return await this.repository.searchPublicRoutes(query, page, userId);
  }

  async getUserRouteStats(uid: string) {
    return await this.repository.getUserRouteStats(uid);
  }
}

export type { IRouteDataProvider };
export default RouteDataProvider;
