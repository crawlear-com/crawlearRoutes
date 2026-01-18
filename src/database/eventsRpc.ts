import supabaseClient from "./supabaseClient";

const getEventRoutes = async (uid: string, startDate: string, endDate: string) => {
    const { data, error } = await supabaseClient.rpc('get_routes_by_user_and_month', { 
      p_uid: uid,
      p_start_date: startDate,
      p_end_date: endDate
    }); 

    if(!error) {
      return data;
    } else {
      throw new Error('Error getting the event routes data');
    }
}

export { getEventRoutes }