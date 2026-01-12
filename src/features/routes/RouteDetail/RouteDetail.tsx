import * as React from "react";
import { getRoute } from "../../../database/routeRpc";
import type { Route } from "../../../types/Route.types";
import GpxRouteMap from "../../maps/GpxRouteMap/GpxRouteMap";
import { NavLink, useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

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
    return <div>
      <h1>{ route.name}</h1>
      <div className="flex">
        <p>{ route.description }</p>
        <span>{ route.difficulty }</span>
        <span>{ route.likes }</span>
      </div>
      <hr />
      <div className="flex">
        <span>{ route.scale }</span>
        <span>{ route.distance }Km { route.durationTime }</span>
      </div>
      <GpxRouteMap gpx={ route.gpx ? route.gpx : undefined } className="h-96 mt-10" />
      <NavLink className="text-primary" to="/" onClick={(e) => { e.preventDefault(); navigate(-1)}}>Back</NavLink>
    </div>
  }

}

export default RouteDetail;