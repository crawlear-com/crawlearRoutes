import GpxRouteMap from "@/features/maps/GpxRouteMap/GpxRouteMap";
import { NavLink, useNavigate } from "react-router";
import DifficultBadge from "@/components/ui/Badge/DifficultBadge/DifficultBadge";
import LikesBadge from "@/components/ui/Badge/LikesBadge/LikesBadge";
import DistanceBadge from "@/components/ui/Badge/DistanceBadge/DistanceBadge";
import DurationBadge from "@/components/ui/Badge/DurationBadge/DistanceBadge";
import ScaleBadge from "@/components/ui/Badge/ScaleBadge/ScaleBadge";
import YoutubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import useRouteDetail from "./hooks/useRouteDetail";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useTranslation } from "react-i18next";

type RouteDetailProps = {
  rid?: string
}

const RouteDetail = ({ rid }: RouteDetailProps) => {
  const navigate = useNavigate();
  const [ route, isLoading ] = useRouteDetail(rid);
  const { t } = useTranslation(["routeCreation"]);

  return (<>
    { isLoading ? <Spinner /> : 
      !route ? <></> : 
        <div className="text-left mx-auto">
          <div className="max-w-[90%] lg:max-w-2/3 mx-auto mt-10">
            <h1 className="mb-5">{ route.name}</h1>
            <div className="flex">
              <p className="flex-6 pr-5">{ route.description }</p>
              <span>
                <DifficultBadge className="flex-1" difficulty={ route.difficulty } />
                <LikesBadge className="flex-1 text-right" likes={ route.likes } />
              </span>
            </div>
            <hr />
            <div className="flex">
              <ScaleBadge className="flex-2 sm:flex-8" scale={ route.scale } />
              <DistanceBadge className="flex-1 text-right" distance={ route.distance } />
              <DurationBadge className="flex-1 text-right" duration={ route.durationTime } />
            </div>
          </div>
          <GpxRouteMap gpx={ route.gpx ? route.gpx : undefined } 
            containerClassName="max-w-[90%] lg:max-w-2/3 mx-auto"
            mapClassName="mt-10 w-full lg:max-w-2/3 mx-auto sm:flex-1" />
          { route.youtubeVideo ? 
            <YoutubeEmbed url={ route.youtubeVideo } className="w-full lg:max-w-2/3 mx-auto" /> :
            <></> }
          <button className="button button-primary p-5 m-auto mt-5">
            <NavLink className="text-white text-center block"
              to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>
              { t("main.back") }
            </NavLink>
          </button>
        </div>
    }</>);
}

export default RouteDetail;