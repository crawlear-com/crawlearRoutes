import supabaseClient from "./supabaseClient";

const getUserRouteStats = async (uid: string) => {
  const { data, error } = await supabaseClient.rpc('getRoutesStats', {
    p_uid: uid
  });

  if(!error && data) {
    return data;
  } else {
    throw new Error('Error geting route statistics');
  }
}

const getUserEventsStats = async (uid: string) => {
  const { data, error } = await supabaseClient.rpc('getEventsStats', {
    p_uid: uid
  });

  if(!error && data) {
    return data;
  } else {
    throw new Error('Error geting events statistics');
  }
}

export { getUserRouteStats, getUserEventsStats }