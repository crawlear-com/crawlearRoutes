import supabaseClient from "./supabaseClient";

import type { ActionPayload } from "../features/routeCreation/store/slices/state.types";

const createRoute = async (payload: ActionPayload) => {
    const { data, error } = await supabaseClient.rpc('insertRoute', { 
      p_name: payload.name,
      p_description: payload.description,
      p_difficulty: payload.difficulty,
      p_ispublic: payload.isPublic,
      p_lat: payload.location.lat,
      p_lon: payload.location.lon,
      p_scale: payload.scale,
      p_youtubevideo: payload.youtubeVideo,
      p_gpx: payload.gpx,
      p_distance: payload.distance,
      p_durationtime: payload.durationTime,
      p_owner: payload.owner
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error creating a route');
    }
}

const modifyRoute = async (payload: ActionPayload) => {
    const { data, error } = await supabaseClient.rpc('updateRoute', { 
      p_id: payload.routeId,
      p_name: payload.name,
      p_description: payload.description,
      p_is_public: payload.isPublic,
      p_difficulty: payload.difficulty,
      p_scale: payload.scale,
      p_location: payload.location,
      p_gpx: payload.gpx,
      p_duration_time: payload.durationTime,
      p_distance: payload.distance,
      p_youtube_video: payload.youtubeVideo,
      p_set_youtube_null: payload.youtubeVideo === ""
    }); 

    if(!error) {
        return data;
    } else {
      throw new Error('Error modifiying a route');
    }
}

export { createRoute, modifyRoute };