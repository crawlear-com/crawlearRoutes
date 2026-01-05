import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";
import type { RoutesDataFromProvider } from "./hooks/RoutesDataFromProvider.types";

const getMyRoutesFull = async (uuid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string): Promise<RoutesDataFromProvider> => {
    const { data, error } = await supabaseClient.rpc('routesByOwner', { 
      in_routeowner: uuid,
      in_page: page,
      in_per_page: ITEMS_PAGE,
      in_order_by: orderBy,
      in_order_dir: orderDir,
      in_q: query
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error accessing getting routes from user');
    }
}

const getLikesFromUserFull = async (uuid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string): Promise<RoutesDataFromProvider> => {
    const { data, error } = await supabaseClient.rpc('likesByUser', { 
      in_uid: uuid,
      in_page: page,
      in_per_page: ITEMS_PAGE,
      in_order_by: orderBy,
      in_order_dir: orderDir,
      in_q: query
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error accessing getting routes from user');
    }
}

const getRoutesInView = async (minLat: number, minLon: number, maxLat: number, maxLon: number) => {
    const { data, error } = await supabaseClient.rpc('routes_in_view', { 
      min_lat: minLat,
      min_long: minLon,
      max_lat: maxLat,
      max_long: maxLon
    }); 

    if(!error) {
        return data;
    } else {
      throw new Error('Error accessing getting routes from user');
    }
}

export { ITEMS_PAGE, getMyRoutesFull, getLikesFromUserFull, getRoutesInView };