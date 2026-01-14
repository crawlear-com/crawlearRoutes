import supabaseClient from "./supabaseClient";

const createRoute = async (name: string, description: string, isPublic: boolean,
  difficulty: number, lat: number, lon: number, scale: number, youtubeVideo: string,
  gpx: string, distance: number, duration: number, id: string) => {
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
      p_owner: id
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error creating a route');
    }
}

const modifyRoute = async (name: string, description: string, isPublic: boolean,
  difficulty: number, lat: number, lon: number, scale: number, youtubeVideo: string,
  gpx: string, distance: number, duration: number, id: string) => {
    const { data, error } = await supabaseClient.rpc('updateRoute', { 
      p_id: id,
      p_name: name,
      p_description: description,
      p_is_public: isPublic,
      p_difficulty: difficulty,
      p_scale: scale,
      p_location: { lat: lat, lon: lon},
      p_gpx: gpx,
      p_duration_time: duration,
      p_distance: distance,
      p_youtube_video: youtubeVideo,
      p_set_youtube_null: youtubeVideo === ""
    }); 

    if(!error) {
        return data;
    } else {
      throw new Error('Error modifiying a route');
    }
}

export { createRoute, modifyRoute };