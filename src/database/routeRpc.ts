import supabaseClient from "./supabaseClient";

const getRoute = async (rid: string) => {
    const { data, error } = await supabaseClient.rpc('getRouteById', { 
      p_rid: rid
    }); 

    if(!error) {
      return data[0];
    } else {
      throw new Error();
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
      throw new Error();
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
      throw new Error();
    }
}


export { getRoute, likeRoute, deleteLike }