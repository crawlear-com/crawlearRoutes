import { getDataAndCacheResponse } from "./RpcCaller";

const getUserRouteStats = async (uid: string) => {
  const args = {
    p_uid: uid
  };
  const { data, error } = await getDataAndCacheResponse('getRoutesStats', args);

  if(!error && data) {
    return data;
  } else {
    throw new Error();
  }
}

const getUserEventsStats = async (uid: string) => {
  const args = {
    p_uid: uid
  };
  const { data, error } = await getDataAndCacheResponse('getEventsStats', args);

  if(!error && data) {
    return data;
  } else {
    throw new Error();
  }
}

export { getUserRouteStats, getUserEventsStats }