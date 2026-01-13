import * as React from "react";
import { getRoute } from "../../../database/routeRpc";
import type { Route } from "../../../types/Route.types";
import GpxRouteMap from "../../maps/GpxRouteMap/GpxRouteMap";
import { NavLink, useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import DifficultBadge from "../../../components/Badge/DifficultBadge/DifficultBadge";
import LikesBadge from "../../../components/LikesBadge/LikesBadge";
import DistanceBadge from "../../../components/Badge/DistanceBadge/DistanceBadge";
import DurationBadge from "../../../components/Badge/DurationBadge/DistanceBadge";
import ScaleBadge from "../../../components/Badge/ScaleBadge/ScaleBadge";

const RouteDetail = () => {
  const [route, setRoute ] = React.useState<Route>();
  const id = useParams().id;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      const promise = getRoute(id);

      promise.then((route) => {
        setRoute(route);
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
    });
    }
  }, [setRoute, id]);

  if (!route) {
    return 
  } else {
    return <div className="m-10 text-left">
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
        <ScaleBadge className="flex-8" scale={ route.scale } />
        <DistanceBadge className="flex-1 text-right" distance={ route.distance } />
        <DurationBadge className="flex-1 text-right" duration={ route.durationTime } />
      </div>
      <GpxRouteMap gpx={ route.gpx ? route.gpx : undefined } className="h-96 mt-10" />
      <NavLink className="text-primary text-center" to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>Back</NavLink>
    </div>
  }

}

export default RouteDetail;