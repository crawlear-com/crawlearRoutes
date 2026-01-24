import GpxRouteMap from "../../maps/GpxRouteMap/GpxRouteMap";
import type { GeoPoint } from "../../../types/Route.types";
import { setDistance, setDuration, setGpx, setLocation } from "../store/slices/routeSlice";
import { selectGpx } from "../store/selectors/routeSelectors";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const GpxRecorder = () => {
  const gpx = useSelector(selectGpx);
  const dispatch = useDispatch();
  const onGpxResolved = (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => {
    try {
      dispatch(setLocation(routePoint));
      dispatch(setGpx(fileContent));
      dispatch(setDistance(distance));
      dispatch(setDuration(duration));
    } catch(e: unknown) {
      toast.error((e as Error).message);
    };
  }

  return (<GpxRouteMap gpx={ gpx || "" } onFileResolved={ onGpxResolved }
    onRouteRecorded={ onGpxResolved } className="mt-10" />);
}

export default GpxRecorder;