import type { Route } from "@/types/Route.types";
import type { ItemListDTO } from "../../DataProvider/RouteDataProvider/RouteDataProvider.types";
import type { ActionPayload } from "@/features/routeCreation/store/slices/state.types";
import type { UserRouteStatisticsData } from "@/features/statistics/RouteStatistics/UserRouteStatistics.types";

interface IRouteRepository {
  getRoute: (rid: string) => Promise<Route>,
  getMyRoutesPaginated: (uuid: string, page: number, orderBy: string, orderDir: string, query: string) => Promise<ItemListDTO<Route>>,
  getMyRoutesFull: (uid: string) => Promise<Array<Route>>,
  getLikesFromUserPaginated: (uid: string, page: number, orderBy: string, orderDir: string, query: string) => Promise<ItemListDTO<Route>>,
  deleteRoute: (rid: string) => void,
  likeRoute: (uid: string, rid: string) => void,
  deleteLikeRoute: (uid: string, rid: string) => void,
  createRoute: (payload: ActionPayload) => Promise<string>,
  modifyRoute: (payload: ActionPayload) => Promise<string>,
  searchRoutesByGeo: (searchBounds: L.LatLngBounds) => Promise<ItemListDTO<Route>>,
  searchPublicRoutes: (query: string, page: number, userId: string) => Promise<ItemListDTO<Route>>,
  getUserRouteStats: (uid: string) => Promise<UserRouteStatisticsData>
}

export type { IRouteRepository };