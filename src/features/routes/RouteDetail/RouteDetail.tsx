import GpxRouteMap from "../../maps/GpxRouteMap/GpxRouteMap";
import { NavLink, useNavigate } from "react-router";
import DifficultBadge from "../../../components/Badge/DifficultBadge/DifficultBadge";
import LikesBadge from "../../../components/Badge/LikesBadge/LikesBadge";
import DistanceBadge from "../../../components/Badge/DistanceBadge/DistanceBadge";
import DurationBadge from "../../../components/Badge/DurationBadge/DistanceBadge";
import ScaleBadge from "../../../components/Badge/ScaleBadge/ScaleBadge";
import YoutubeEmbed from "../../../components/YoutubeEmbed/YoutubeEmbed";
import useRouteDetail from "./hooks/useRouteDetail";
import Spinner from "../../../components/Spinner/Spinner";

type RouteDetailProps = {
  rid?: string
}

const RouteDetail = ({ rid }: RouteDetailProps) => {
  const navigate = useNavigate();
  const [ route, isLoading ] = useRouteDetail(rid);

  return (<>
    { isLoading ? <Spinner /> : 
      !route ? <></> : 
        <div className="text-left mx-auto">
        <div className="max-w-[90%] lg:max-w-2/3 mx-auto">
          <h1>{ route.name}</h1>
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
          className="mt-10 w-full lg:max-w-2/3 mx-auto" />
        { route.youtubeVideo ? 
          <YoutubeEmbed url={ route.youtubeVideo } className="w-full lg:max-w-2/3 mx-auto" /> :
          <></> }
        <NavLink className="text-primary text-center block"
          to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>Back</NavLink>
      </div>
    }</>);
}

export default RouteDetail;