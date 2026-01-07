import * as React from "react";
import GpxRouteMap from "../../../maps/GpxRouteMap/GpxRouteMap";
import type { GeoPoint } from "../../../../types/Route.types";

const GpxRecord = () => {
  const [ gpx, setGpx ] = React.useState(undefined);
  const onGpxResolved = (fileContent: string, routePoint: GeoPoint) => {

  }

  return (<div className="w-screen h-screen">
      <GpxRouteMap gpx={ gpx } onFileResolved={ onGpxResolved } 
        onRouteRecorded={ onGpxResolved } className="h-96 sm:h-[60%] m-5" />
    </div>);
}

export default GpxRecord;