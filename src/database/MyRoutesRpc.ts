import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";
import type { RoutesData } from "./hooks/routesData";

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

const getMyRoutesPage = async (uuid: string, page: number): Promise<RoutesData> => {
    const { data, error } = await supabaseClient.rpc('routesByOwner_paginated', { 
      routeowner: uuid,
      page: page,
      per_page: ITEMS_PAGE
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

const getLikesFromUserPage = async (uuid: string, page: number): Promise<RoutesData> => {
    const { data, error } = await supabaseClient.rpc('likesByUser_paginated', { 
      routeowner: uuid,
      page: page,
      per_page: ITEMS_PAGE
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error accessing getting liked routes from user');
    }
}

export { ITEMS_PAGE, getMyRoutes, getLikesFromUser, getMyRoutesPage, getLikesFromUserPage };