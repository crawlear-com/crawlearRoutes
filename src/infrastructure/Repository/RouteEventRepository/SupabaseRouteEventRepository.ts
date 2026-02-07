import type { IRouteEventRepository } from "./RouteEventRepository.types";
import { getDataAndCacheResponse } from "../../RpcCaller";
import supabaseClient, { ITEMS_PAGE } from "@/infrastructure/supabaseClient";
import type { ItemListDTO } from "../../DataProvider/RouteDataProvider/RouteDataProvider.types";
import type { RouteEvent } from "@/types/RouteEvent.types";
import type { GeoPoint } from "@/types/Route.types";

class SupabaseRouteEventRepository implements IRouteEventRepository {
  async getEventRouteEventsPaginated(uid: string, page: number, orderBy: string,
    orderDir = 'asc', query: string): Promise<ItemListDTO<RouteEvent>> {
    const args = { 
      p_uid: uid,
      p_page: page + 1,
      p_per_page: ITEMS_PAGE,
      p_order_by: orderBy,
      p_order_dir: orderDir,
      p_q: query
    };

    const { data, error } = await getDataAndCacheResponse('eventsByOwnerPaginated',  args); 

    if (!error) {
      return data;
    } else {
      throw new Error(`Error loading favorite routes: ${error.message}`);
    }
  }

  async getEventRoutesByMonth (uid: string, startDate: string, endDate: string) {
    const args = { 
      p_uid: uid,
      p_start_date: startDate,
      p_end_date: endDate
    };
    const { data, error } = await getDataAndCacheResponse('getEventRoutesByUserAndMonth', args); 

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async getEventRouteEventsByMonth(uid: string, startDate: string, endDate: string) {
    const args = { 
      p_uid: uid,
      p_start_date: startDate,
      p_end_date: endDate
    };
    const { data, error } = await getDataAndCacheResponse('eventsByOwnerAndMonth', args); 

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async getRouteEventByIdAndOwner(uid: string, eid: string) {
    const args = {       
      p_eventid: eid,
      p_owner: uid
    };
    const { data, error } = await getDataAndCacheResponse('getEventByIdAndOwner', args); 

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async getRouteEventById(eid: string) {
    const args = {       
      p_eventid: eid
    };
    const { data, error } = await getDataAndCacheResponse('getEventById', args); 

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async assignRouteToEvent(eid: string, rid: string, owner: string) {
    const { data, error } = await supabaseClient.rpc('assignEventRid', {       
      p_eid: eid,
      p_rid: rid,
      p_uid: owner
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async deleteEventRoute(eid: string) {
    const { data, error } = await supabaseClient.rpc('deleteEventById', {
      p_id: eid
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async getTodayEvents(uid: string) {
    const args = {
      p_uid: uid
    };
    const { data, error } = await getDataAndCacheResponse('eventsByOwnerToday', args);

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async setEventStartDate(eid: string, startDate: string) {
    const { data, error } = await supabaseClient.rpc('updateEventDate', {
      p_eid: eid,
      p_date: startDate
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async createEventRoute(name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, owner: string) {
    const { data, error } = await supabaseClient.rpc('insertEvent', {       
      p_name: name,
      p_description: description,
      p_lat: location?.lat || null,
      p_lon: location?.lon || null,
      p_date: date,
      p_scale: scale,
      p_rid: rid,
      p_owner: owner
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async modifyEventRoute(name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, eid: string) {
    const { data, error } = await supabaseClient.rpc('updateEvent', {       
      p_id: eid,
      p_name: name,
      p_description: description,
      p_lat: location?.lat || null,
      p_lon: location?.lon || null,
      p_date: date,
      p_scale: scale,
      p_rid: rid
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async searchEventsByGeo(searchBounds: L.LatLngBounds) {
    const { data, error } = await supabaseClient.rpc('searchEventsByGeo', { 
      p_min_lat: searchBounds.getNorth(),
      p_min_lon: searchBounds.getWest(),
      p_max_lat: searchBounds.getSouth(),
      p_max_lon: searchBounds.getEast()
    }); 

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
  }

  async getUserEventsStats(uid: string) {
    const args = {
      p_uid: uid
    };
    const { data, error } = await getDataAndCacheResponse('getEventsStats', args);

    if(!error && data) {
      return data;
    } else {
      throw new Error();
    }
  }
}

export default SupabaseRouteEventRepository;