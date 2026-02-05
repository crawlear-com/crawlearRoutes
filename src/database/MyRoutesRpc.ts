import { getDataAndCacheResponse } from "./RpcCaller";
import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";

const getMyRoutesPaginated = async (uuid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string) => {
  const args = { 
    in_routeowner: uuid,
    in_page: page + 1,
    in_per_page: ITEMS_PAGE,
    in_order_by: orderBy,
    in_order_dir: orderDir,
    in_q: query
  }
  
  return getDataAndCacheResponse("routesByOwner", args);
}

const getMyRoutesFull = async (uid: string) => {
  return await supabaseClient.rpc('routesByOwnerFull', { 
    p_uid: uid
  });
}

const getLikesFromUserPaginated = async (uid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string) => {
  const args = { 
    in_uid: uid,
    in_page: page + 1,
    in_per_page: ITEMS_PAGE,
    in_order_by: orderBy,
    in_order_dir: orderDir,
    in_q: query
  };

  return getDataAndCacheResponse("likesByUser", args);
}

const deleteRouteAndLikes = async (id: string) => {
    const { data, error } = await supabaseClient.rpc('deleteRouteById', { 
      p_id: id
    }); 

    if(!error && data) {
        return data;
    } else {
      throw new Error();
    }
}

export { ITEMS_PAGE, getMyRoutesPaginated, getMyRoutesFull, getLikesFromUserPaginated,
  deleteRouteAndLikes };