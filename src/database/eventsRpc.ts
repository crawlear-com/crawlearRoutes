import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";

const getEventRouteEventsPaginated = async (uid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string) => {
  return await supabaseClient.rpc('events_by_owner_paginated', { 
    p_uid: uid,
    p_page: page + 1,
    p_per_page: ITEMS_PAGE,
    p_order_by: orderBy,
    p_order_dir: orderDir,
    p_q: query
  }); 
}

const getEventRoutesByMonth = async (uid: string, startDate: string, endDate: string) => {
    const { data, error } = await supabaseClient.rpc('getEventRoutesByUserAndMonth', { 
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

const getEventRouteEventsByMonth = async (uid: string, startDate: string, endDate: string) => {
    const { data, error } = await supabaseClient.rpc('eventsByOwnerAndMonth', { 
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

const getRouteEventByIdAndOwner = async (uid: string, eid: string) => {
    const { data, error } = await supabaseClient.rpc('getEventByIdAndOwner', {       
      p_eventid: eid,
      p_owner: uid
    }); 

    if(!error) {
      return data;
    } else {
      throw new Error('Error getting the event route data');
    }
}

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

const deleteEventRoute = async (eid: string, uid: string) => {
    const { data, error } = await supabaseClient.rpc('deleteEvent', {
      p_eid: eid,
      p_uid: uid
    });

    if(!error) {
      return data;
    } else {
      throw new Error('Error modifying route event');
    }
}

export { getEventRoutesByMonth, getEventRouteEventsByMonth, getRouteEventByIdAndOwner,
  getEventRouteEventsPaginated, createEventRoute, modifyEventRoute, deleteEventRoute }