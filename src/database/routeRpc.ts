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

export { getRoute }