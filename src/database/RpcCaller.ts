import { isOffline } from "@/components/Offline/helpers/offline";
import supabaseClient from "./supabaseClient";

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
      throw new Error(`Error loading routes: ${"offline error"}`);
    }    
  } else {
    const response = await supabaseClient.rpc(functionName, functionArgs);

    if (!response.error) {      
      localStorage.setItem(key, JSON.stringify(response));
      return response;
    } else {
      throw new Error(`Error loading routes: ${response.error.message}`);
    }
  }
}

export { getDataAndCacheResponse };