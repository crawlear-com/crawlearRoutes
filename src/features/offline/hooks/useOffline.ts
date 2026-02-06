import React from "react";
import { useDispatch } from "react-redux";
import { setIsOffline } from "../store/slice/offlineSlice";
import { isOffline } from "../helpers/offline";

const useOffline = () => {
  const dispatch = useDispatch();
  const onOffline = React.useCallback(() => {
    dispatch(setIsOffline(true));
  }, [dispatch]);
  const onOnline = React.useCallback(() => {
    dispatch(setIsOffline(false));
  }, [dispatch]);

  React.useEffect(() => {
    if (isOffline()) {
      dispatch(setIsOffline(true));
    }
    window.addEventListener('offline', onOffline);
    window.addEventListener('online', onOnline);

    return (() => {
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('online', onOnline);
    });
  }, [onOnline, onOffline, dispatch]);
}

export default useOffline;
