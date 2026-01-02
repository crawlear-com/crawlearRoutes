import supabaseClient, { ITEMS_PAGE } from "./supabaseClient";
import type { RoutesDataFromProvider } from "./hooks/RoutesDataFromProvider.types";

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

const getMyRoutesPage = async (uuid: string, page: number): Promise<RoutesDataFromProvider> => {
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

const getMyRoutesFull = async (uuid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string): Promise<RoutesDataFromProvider> => {
    const { data, error } = await supabaseClient.rpc('routesByOwner_full', { 
      in_routeowner: uuid,
      in_page: page,
      in_per_page: ITEMS_PAGE,
      in_order_by: orderBy,
      in_order_dir: orderDir,
      in_q: query
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

const getLikesFromUserPage = async (uuid: string, page: number): Promise<RoutesDataFromProvider> => {
    const { data, error } = await supabaseClient.rpc('likesByUser_paginated', { 
      in_uid: uuid,
      in_page: page,
      in_per_page: ITEMS_PAGE
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error accessing getting liked routes from user');
    }
}

const getLikesFromUserFull = async (uuid: string, page: number, orderBy: string,
  orderDir = 'asc', query: string): Promise<RoutesDataFromProvider> => {
    const { data, error } = await supabaseClient.rpc('likesByUser_paginated', { 
      in_uid: uuid,
      in_page: page,
      in_per_page: ITEMS_PAGE,
      in_order_by: orderBy,
      in_order_dir: orderDir,
      in_q: query
    }); 

    if(!error) {
        return data[0];
    } else {
      throw new Error('Error accessing getting routes from user');
    }
}

export { ITEMS_PAGE, getMyRoutes, getLikesFromUser, getMyRoutesPage, getLikesFromUserPage,
  getMyRoutesFull, getLikesFromUserFull };