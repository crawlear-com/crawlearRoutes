import { useDispatch, useSelector } from "react-redux";
import { selectGpx } from "../../store/selectors/routeSelectors";
import { setDistance, setDuration, setGpx, setIsRecording, setLocation } from "../../store/slices/routeSlice";
import type { GeoPoint } from "@/types/Route.types";
import toast from "react-hot-toast";

const useGpxRecorer = (): [ 
    string | null, 
    (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void,
    () => void, () => void] => {
  const gpx = useSelector(selectGpx);
  const dispatch = useDispatch();
  const onGpxResolved = (fileContent: string, routePoint: GeoPoint, distance: number,
    duration: number) => {
    try {
      dispatch(setLocation(routePoint));
      dispatch(setGpx(fileContent));
      dispatch(setDistance(distance));
      dispatch(setDuration(duration));
    } catch(e: unknown) {
      toast.error((e as Error).message);
    };
  }

  const onStartRecording = () => {
    console.log("dispatch! start");
    dispatch(setIsRecording(true));
  }
  const onStopRecording = () => {
    console.log("dispatch! stop");
    dispatch(setIsRecording(false));
  }

  return [ gpx, onGpxResolved, onStopRecording, onStartRecording ];
}

export default useGpxRecorer;