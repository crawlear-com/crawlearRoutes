import supabaseClient from "./supabaseClient";

const getRoute = async (rid: string) => {
    const { data, error } = await supabaseClient.rpc('getRouteById', { 
      p_rid: rid
    }); 

    if(!error) {
      return data[0];
    } else {
      throw new Error('Error getting the route data');
    }
}

const likeRoute = async (uid: string, rid: string) => {
    const { data, error } = await supabaseClient.rpc('insertLike', { 
      p_uid: uid,
      p_rid: rid
    }); 

    if(!error) {
      return data.like;
    } else {
      throw new Error('Error liking route');
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


export { getRoute, likeRoute, deleteLike }