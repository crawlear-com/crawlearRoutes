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

const deleteRouteAndLikes = async (id: string) => {
    const { data, error } = await supabaseClient.rpc('deleteRouteById', { 
      p_id: id
    }); 

    if(!error && data) {
        return data;
    } else {
      throw new Error('Error deleting route');
    }
}

export { ITEMS_PAGE, getMyRoutesFull, getLikesFromUserFull, deleteRouteAndLikes };