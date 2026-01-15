import type { GpxInfoCardProps } from "./GpxInfoCard.types";

const GpxInfoCard = ({ gpxInfo }: GpxInfoCardProps) => {
    return <div className="card grid grid-cols-2 sm:grid-cols-3 w-full lg:max-w-1/2 mx-auto">
        <span><b>distancia</b>{`: ${(gpxInfo.distance/1000).toFixed(3)} m`}</span>
        <span><b>tiempo</b>{`: ${((gpxInfo.time/1000)/60).toFixed(3)} mins`}</span>
        <span><b>tiempo mov</b>{`: ${((gpxInfo.movingTime/1000)/60).toFixed(3)} mins`}</span>
        <span><b>elevacionmin</b>{`: ${(gpxInfo.elevationMin).toFixed(3)} m`}</span>
        <span><b>elevacionmax</b>{`: ${(gpxInfo.elevationMax).toFixed(3)} m`}</span>
        <span><b>velocidad</b>{`: ${(gpxInfo.speed).toFixed(3)} Km/h`}</span>
      </div>
}

export default GpxInfoCard;