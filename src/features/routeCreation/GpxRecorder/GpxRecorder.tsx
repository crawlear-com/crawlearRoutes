import GpxRouteMap from "@/features/maps/GpxRouteMap/GpxRouteMap";
import useGpxRecorer from "./hooks/useGpxRecorder";

const GpxRecorder = () => {
  const [ gpx, onGpxResolved, onStopRecording, onStartRecording ] = useGpxRecorer();
  return (<GpxRouteMap gpx={ gpx || "" } onFileResolved={ onGpxResolved }
    onStopRecording = { onStopRecording } onStartRecording = { onStartRecording }
    onRouteRecorded={ onGpxResolved } containerClassName="max-w-[90%] mx-auto"
    mapClassName="mt-10 w-[90%] sm:w-[45%] mx-auto" />);
}

export default GpxRecorder;