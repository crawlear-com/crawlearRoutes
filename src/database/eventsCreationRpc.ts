import supabaseClient from "./supabaseClient";

const createEventRoute = async (name: string, description: string, date: Date, scale: number, rid: string | null, owner: string) => {
    const { data, error } = await supabaseClient.rpc('insertEvent', {       
      p_name: name,
      p_description: description,
      p_date: date,
      p_scale: scale,
      p_rid: rid,
      p_owner: owner
    });

    if(!error) {
      return data;
    } else {
      throw new Error('Error creating route event');
    }
}

const modifyEventRoute = async (name: string, description: string, date: Date, scale: number, rid: string | null, eid: string) => {
    const { data, error } = await supabaseClient.rpc('updateEvent', {       
      p_id: eid,
      p_name: name,
      p_description: description,
      p_date: date,
      p_scale: scale,
      p_rid: rid
    });

    if(!error) {
      return data;
    } else {
      throw new Error('Error modifying route event');
    }
}

export { createEventRoute, modifyEventRoute };