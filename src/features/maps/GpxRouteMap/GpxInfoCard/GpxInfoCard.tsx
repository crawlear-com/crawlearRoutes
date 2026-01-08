import type { GpxInfoCardProps } from "./GpxInfoCard.types";

const GpxInfoCard = ({ gpxInfo }: GpxInfoCardProps) => {
    return <div className="extraGpxInfoContainer rounded rounded3">
        <span className="bold">distancia</span><span>{`: ${(gpxInfo.distance/1000).toFixed(3)} m`}</span><br />
        <span className="bold">tiempo</span><span>{`: ${((gpxInfo.time/1000)/60).toFixed(3)} mins`}</span><br />
        <span className="bold">tiempo mov</span><span>{`: ${((gpxInfo.movingTime/1000)/60).toFixed(3)} mins`}</span><br />
        <span className="bold">elevacionmin</span><span>{`: ${(gpxInfo.elevationMin).toFixed(3)} m`}</span><br />
        <span className="bold">elevacionmax</span><span>{`: ${(gpxInfo.elevationMax).toFixed(3)} m`}</span><br />
        <span className="bold">velocidad</span><span>{`: ${(gpxInfo.speed).toFixed(3)} Km/h`}</span><br />
      </div>
}

export default GpxInfoCard;