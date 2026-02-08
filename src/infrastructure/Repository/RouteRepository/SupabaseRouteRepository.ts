import type { Route } from "@/domain/Route.types";
import type { IRouteRepository } from "../../../domain/RouteRepository.types";
import { getDataAndCacheResponse } from "../../RpcCaller";
import supabaseClient, { ITEMS_PAGE } from "../../supabaseClient";
import type { ActionPayload } from "@/application/features/routeCreation/store/slices/state.types";
import type { ItemListDTO } from "@/infrastructure/ItemListDTO.types";

class SupabaseRouteRepository implements IRouteRepository {
  async getRoute(rid: string): Promise<Route> {
    const args = { 
      p_rid: rid
    };
    const { data, error } = await getDataAndCacheResponse('getRouteById', args);

    if(!error) {
      return data[0];
    } else {
      throw new Error();
    }
  }

  async getMyRoutesPaginated(uuid: string, page: number, orderBy: string, orderDir: string, query: string):Promise<ItemListDTO<Route>> {
    const args = { 
      in_routeowner: uuid,
      in_page: page + 1,
      in_per_page: ITEMS_PAGE,
      in_order_by: orderBy,
      in_order_dir: orderDir,
      in_q: query
    }    
    const { data, error } = await getDataAndCacheResponse("routesByOwner", args);

    if(!error) {
      return data[0];
    } else {
      throw new Error(`Error loading routes: ${error.message}`);
    }
  }

  async getMyRoutesFull(uid: string): Promise<Array<Route>> {
    const args = { p_uid: uid };
    const { error, data } =  await supabaseClient.rpc('routesByOwnerFull', args);

    if (!error) {
      return data;
    } else {
      throw new Error(`Error loading routes: ${error.message}`);
    }
  }

  async getLikesFromUserPaginated(uid: string, page: number, orderBy: string, orderDir: string, query: string):Promise<ItemListDTO<Route>> {
    const args = { 
      in_uid: uid,
      in_page: page + 1,
      in_per_page: ITEMS_PAGE,
      in_order_by: orderBy,
      in_order_dir: orderDir,
      in_q: query
    };
    const { error, data } = await getDataAndCacheResponse("likesByUser", args);

    if (!error) {
      return data[0];
    } else {
      throw new Error(`Error loading favorite routes: ${error.message}`);
    }
  }

  async deleteRoute(id: string) {
    const { data, error } = await supabaseClient.rpc('deleteRouteById', { 
      p_id: id
    }); 

    if(!error) {
        return data;
    } else {
      throw new Error(`Error deleting route: ${error.message}`);
    }
  }

  async likeRoute(uid: string, rid: string) {
    const { data, error } = await supabaseClient.rpc('insertLike', { 
      p_uid: uid,
      p_rid: rid
    }); 

    if(!error) {
      return data.like;
    } else {
      throw new Error();
    }
  }

  async deleteLikeRoute(uid: string, rid: string) {
    const { data, error } = await supabaseClient.rpc('deleteLikeByUidAndRid', { 
      p_uid: uid,
      p_rid: rid
    }); 

    if(!error && data) {
        return data;
    } else {
      throw new Error();
    }
  }

  async createRoute(payload: ActionPayload) {
    const { data, error } = await supabaseClient.rpc('insertRoute', { 
      p_name: payload.name,
      p_description: payload.description,
      p_difficulty: payload.difficulty,
      p_ispublic: payload.isPublic,
      p_lat: payload.location?.lat ?? null,
      p_lon: payload.location?.lon ?? null,
      p_scale: payload.scale,
      p_youtubevideo: payload.youtubeVideo,
      p_gpx: payload.gpx,
      p_distance: payload.distance,
      p_durationtime: payload.durationTime,
      p_owner: payload.owner
    }); 

    if(!error) {
        return data;
    } else {
      throw new Error();
    }
  }

  async modifyRoute(payload: ActionPayload) {
    const { data, error } = await supabaseClient.rpc('updateRoute', { 
      p_id: payload.rid,
      p_name: payload.name,
      p_description: payload.description,
      p_is_public: payload.isPublic,
      p_difficulty: payload.difficulty,
      p_scale: payload.scale,
      p_location: payload.location,
      p_gpx: payload.gpx,
      p_duration_time: payload.durationTime,
      p_distance: payload.distance,
      p_youtube_video: payload.youtubeVideo,
      p_set_youtube_null: payload.youtubeVideo === ""
    }); 

    if(!error) {
        return data;
    } else {
      throw new Error();
    }
  }

  async searchRoutesByGeo(searchBounds: L.LatLngBounds) {
    const { data, error } = await supabaseClient.rpc('searchRoutesByGeo', { 
      min_lat: searchBounds.getNorth(),
      min_long: searchBounds.getWest(),
      max_lat: searchBounds.getSouth(),
      max_long: searchBounds.getEast()
    }); 

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async searchPublicRoutes(query: string, page: number, userId: string) {
    const args = { 
      p_q: query,
      p_user_id: userId, 
      p_page: page,
      p_per_page: ITEMS_PAGE
    };
    const { data, error } = await getDataAndCacheResponse('searchPublicRoutes', args); 

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }
 
  async getUserRouteStats(uid: string) {
    const args = {
      p_uid: uid
    };
    const { data, error } = await getDataAndCacheResponse('getRoutesStats', args);

    if(!error && data) {
      return data;
    } else {
      throw new Error();
    }
  }
}

export default SupabaseRouteRepository;