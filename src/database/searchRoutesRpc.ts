import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";

const searchRoutesByGeo = async (searchBounds: L.LatLngBounds) => {
  return await supabaseClient.rpc('searchRoutesByGeo', { 
    min_lat: searchBounds.getNorth(),
    min_long: searchBounds.getWest(),
    max_lat: searchBounds.getSouth(),
    max_long: searchBounds.getEast()
  }); 
}

const searchPublicRoutes = async (query: string, page: number, userId: string) => {
  return await supabaseClient.rpc('searchPublicRoutes', { 
    p_q: query,
    p_user_id: userId, 
    p_page: page,
    p_per_page: ITEMS_PAGE
  }); 
}

export { searchPublicRoutes, searchRoutesByGeo };