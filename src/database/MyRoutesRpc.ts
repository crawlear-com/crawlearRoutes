import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";

const getMyRoutesFull = async (uuid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string) => {
  return await supabaseClient.rpc('routesByOwner', { 
    in_routeowner: uuid,
    in_page: page + 1,
    in_per_page: ITEMS_PAGE,
    in_order_by: orderBy,
    in_order_dir: orderDir,
    in_q: query
  });
}

const getLikesFromUserFull = async (uuid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string) => {
  return await supabaseClient.rpc('likesByUser', { 
    in_uid: uuid,
    in_page: page + 1,
    in_per_page: ITEMS_PAGE,
    in_order_by: orderBy,
    in_order_dir: orderDir,
    in_q: query
  }); 
}

const searchRoutesByGeo = async (searchBounds: L.LatLngBounds) => {
  return await supabaseClient.rpc('searchRoutesByGeo', { 
    min_lat: searchBounds.getNorth(),
    min_long: searchBounds.getWest(),
    max_lat: searchBounds.getSouth(),
    max_long: searchBounds.getEast()
  }); 
}

const searchPublicRoutes = async (query: string, page: number) => {
  return await supabaseClient.rpc('searchPublicRoutes', { 
    p_q: query,
    p_page: page,
    p_per_page: ITEMS_PAGE
  }); 
}

const deleteRoute = async (id: string) => {
    const { data, error } = await supabaseClient.rpc('deleteRouteById', { 
      p_id: id
    }); 

    if(!error && data) {
        return data;
    } else {
      throw new Error('Error deleting route');
    }
}

const deleteLike = async (uid: string, rid: string) => {
    const { data, error } = await supabaseClient.rpc('deleteLikeByUidAndRid', { 
      p_uid: uid,
      p_rid: rid
    }); 

    if(!error && data) {
        return data;
    } else {
      throw new Error('Error deleting favorite');
    }
}

export { ITEMS_PAGE, getMyRoutesFull, getLikesFromUserFull, searchRoutesByGeo, searchPublicRoutes,
  deleteRoute, deleteLike };