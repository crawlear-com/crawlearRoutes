import supabaseClient from "./supabaseClient";

const createRoute = async (name: string, description: string, isPublic: boolean,
  difficulty: number, lat: number, lon: number, scale: number, youtubeVideo: string,
  gpx: string, distance: number, duration: number, owner: string) => {
    const { data, error } = await supabaseClient.rpc('insertRoute', { 
      p_name: name,
      p_description: description,
      p_difficulty: difficulty,
      p_ispublic: isPublic,
      p_lat: lat,
      p_lon: lon,
      p_scale: scale,
      p_youtubevideo: youtubeVideo,
      p_gpx: gpx,
      p_distance: distance,
      p_durationtime: duration,
      p_owner: owner
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error creating a route');
    }
}

export { createRoute }