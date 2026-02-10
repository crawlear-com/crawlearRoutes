import { useTranslation } from "react-i18next";
import { toHours, toKm } from "@/application/helpers/utils";
import type { GpxInfoCardProps } from "./GpxInfoCard.types";
import ElevationChart from "@/application/features/routes/RouteDetail/ElevationChart/ElevationChart";

const GpxInfoCard = ({ gpxInfo, className }: GpxInfoCardProps) => {
    const { t } = useTranslation(["map"]);

    return <div className={`card ${ className ? className : '' }`}>
        <div className={`grid grid-cols-1 sm:grid-cols-3 `}>
            <span><b>{ t('main.distance') }</b>{`: ${toKm(gpxInfo.distance)} km`}</span>
            <span><b>{ t('main.time') }</b>{`: ${toHours(gpxInfo.time)} h`}</span>
            <span><b>{ t('main.movement time') }</b>{`: ${toHours(gpxInfo.movingTime)} h`}</span>
            <span><b>{ t('main.elevation min') }</b>{`: ${toKm(gpxInfo.elevationMin)} m`}</span>
            <span><b>{ t('main.elevation max') }</b>{`: ${toKm(gpxInfo.elevationMax)} m`}</span>
            <span><b>{ t('main.speed') }</b>{`: ${(gpxInfo.speed).toFixed(2)} Km/h`}</span>
        </div>
        { gpxInfo.elevationData ? <ElevationChart className="h-96 w-full" data={ gpxInfo.elevationData } /> : 
            <div className="h-96 w-full text-center mt-10 font-bold">{ t("main.no data") }</div>}
      </div>
}

export default GpxInfoCard;