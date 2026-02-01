import type { GeoPoint } from "@/types/Route.types";
import supabaseClient from "./supabaseClient";

const createEventRoute = async (name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, owner: string) => {
    const { data, error } = await supabaseClient.rpc('insertEvent', {       
      p_name: name,
      p_description: description,
      p_lat: location?.lat || null,
      p_lon: location?.lon || null,
      p_date: date,
      p_scale: scale,
      p_rid: rid,
      p_owner: owner
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
}

const modifyEventRoute = async (name: string, description: string, location: GeoPoint | null, date: Date, scale: number, rid: string | null, eid: string) => {
    const { data, error } = await supabaseClient.rpc('updateEvent', {       
      p_id: eid,
      p_name: name,
      p_description: description,
      p_lat: location?.lat || null,
      p_lon: location?.lon || null,
      p_date: date,
      p_scale: scale,
      p_rid: rid
    });

    if(!error) {
      return data;
    } else {
      throw new Error();
    }
}

export { createEventRoute, modifyEventRoute };