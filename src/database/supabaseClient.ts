import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default supabaseClient;

const getMyRoutes = async (uuid: string) => {
    const { data, error } = await supabaseClient.rpc('routesByOwner', { 
      routeowner: uuid 
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error accessing getting routes from user');
    }
}

const getLikesFromUser = async (uuid: string) => {
  const { data, error } = await supabaseClient.rpc('likesByUser', { 
    in_uid: uuid 
  }); 

  if(!error) {
      return data;
  } else {
    throw new Error('Error accessing getting liked routes from user');
  }
}
export { getMyRoutes, getLikesFromUser };