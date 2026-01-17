import { useTranslation } from "react-i18next";
import { toHours, toKm } from "../../../../helpers/utils";
import type { GpxInfoCardProps } from "./GpxInfoCard.types";

const GpxInfoCard = ({ gpxInfo }: GpxInfoCardProps) => {
    const { t } = useTranslation(["map"]);
    return <div className="card grid grid-cols-1 sm:grid-cols-3 w-full lg:max-w-2/3 mx-auto">
        <span><b>{ t('main.distance') }</b>{`: ${toKm(gpxInfo.distance)} km`}</span>
        <span><b>{ t('main.time') }</b>{`: ${toHours(gpxInfo.time)} h`}</span>
        <span><b>{ t('main.movement time') }</b>{`: ${toHours(gpxInfo.movingTime)} h`}</span>
        <span><b>{ t('main.elevation min') }</b>{`: ${toKm(gpxInfo.elevationMin)} m`}</span>
        <span><b>{ t('main.elevation max') }</b>{`: ${toKm(gpxInfo.elevationMax)} m`}</span>
        <span><b>{ t('main.speed') }</b>{`: ${(gpxInfo.speed).toFixed(2)} Km/h`}</span>
      </div>
}

export default GpxInfoCard;