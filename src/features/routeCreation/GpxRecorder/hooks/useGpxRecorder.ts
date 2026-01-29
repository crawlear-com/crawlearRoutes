import { useDispatch, useSelector } from "react-redux";
import { selectGpx } from "../../store/selectors/routeSelectors";
import { setDistance, setDuration, setGpx, setLocation } from "../../store/slices/routeSlice";
import type { GeoPoint } from "@/types/Route.types";
import toast from "react-hot-toast";

const useGpxRecorer = (): [ 
    string | null, (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void
  ] => {
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

  return [ gpx, onGpxResolved ];
}

export default useGpxRecorer;