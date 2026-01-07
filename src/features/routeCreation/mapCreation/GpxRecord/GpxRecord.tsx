import GpxRouteMap from "../../../maps/GpxRouteMap/GpxRouteMap";
import type { GeoPoint } from "../../../../types/Route.types";
import { setGpx, setQuadrant } from "../../store/slices/routeSlice";
import { selectGpx } from "../../store/selectors/userSelectors";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { parseGpxString } from "../../../maps/GpxRouteMap/helpers/Utils";

const GpxRecord = () => {
  const gpx = useSelector(selectGpx);
  const onGpxResolved = (fileContent: string, routePoint: GeoPoint) => {
    try {
      setQuadrant(routePoint);
      setGpx(parseGpxString(fileContent));
    } catch(e: unknown) {
      toast.error((e as Error).message)
    };
  }

  return (<div className="w-screen h-screen">
      <GpxRouteMap gpx={ gpx } onFileResolved={ onGpxResolved } 
        onRouteRecorded={ onGpxResolved } className="h-96 sm:h-[60%] m-5" />
    </div>);
}

export default GpxRecord;