import { getDataAndCacheResponse } from "./RpcCaller";
import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";

const getEventRouteEventsPaginated = async (uid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string) => {
  const args = { 
    p_uid: uid,
    p_page: page + 1,
    p_per_page: ITEMS_PAGE,
    p_order_by: orderBy,
    p_order_dir: orderDir,
    p_q: query
  };

  return getDataAndCacheResponse('eventsByOwnerPaginated',  args); 
}

const getEventRoutesByMonth = async (uid: string, startDate: string, endDate: string) => {
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

const getEventRouteEventsByMonth = async (uid: string, startDate: string, endDate: string) => {
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

const getRouteEventByIdAndOwner = async (uid: string, eid: string) => {
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

const getRouteEventById = async (eid: string) => {
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

const searchEventsByGeo = async (searchBounds: L.LatLngBounds) => {
  return await supabaseClient.rpc('searchEventsByGeo', { 
    p_min_lat: searchBounds.getNorth(),
    p_min_lon: searchBounds.getWest(),
    p_max_lat: searchBounds.getSouth(),
    p_max_lon: searchBounds.getEast()
  }); 
}


const assignRouteToEvent = async (eid: string, rid: string, owner: string) => {
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

const deleteEventRoute = async (eid: string) => {
    const { data, error } = await supabaseClient.rpc('deleteEventById', {
      p_id: eid
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
}

const getTodayEvents = async (uid: string) => {
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

const setEventStartDate = async (eid: string, startDate: string) => {
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

export { getEventRoutesByMonth, getEventRouteEventsByMonth, getRouteEventByIdAndOwner,
  getEventRouteEventsPaginated, deleteEventRoute, searchEventsByGeo,
  getTodayEvents, assignRouteToEvent, setEventStartDate, getRouteEventById };