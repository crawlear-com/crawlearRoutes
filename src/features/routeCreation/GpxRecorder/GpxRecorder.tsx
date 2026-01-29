import GpxRouteMap from "@/features/maps/GpxRouteMap/GpxRouteMap";
import useGpxRecorer from "./hooks/useGpxRecorder";

const GpxRecorder = () => {
  const [ gpx, onGpxResolved ] = useGpxRecorer();
  return (<GpxRouteMap gpx={ gpx || "" } onFileResolved={ onGpxResolved }
    onRouteRecorded={ onGpxResolved } containerClassName="max-w-[90%] mx-auto"
    mapClassName="mt-10 w-[90%] sm:w-[45%] mx-auto" />);
}

export default GpxRecorder;