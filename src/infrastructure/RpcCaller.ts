import { isOffline } from "@/features/offline/helpers/offline";
import supabaseClient from "@/infrastructure/supabaseClient";

type FunctionArgs = {
  [key: string]: string | number | undefined
}

const getDataAndCacheResponse = async (functionName: string, functionArgs: FunctionArgs) => {
  const key = functionName + JSON.stringify(functionArgs);

  if (isOffline()) {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    } else {
      throw new Error(`Error loading from cache: data not found`);
    }    
  } else {
    const response = await supabaseClient.rpc(functionName, functionArgs);

    if (!response.error) {      
      localStorage.setItem(key, JSON.stringify(response));
      return response;
    } else {
      throw new Error(`Error loading from database: ${response.error.message}`);
    }
  }
}

export { getDataAndCacheResponse };