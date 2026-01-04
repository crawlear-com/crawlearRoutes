import { XMLParser } from 'fast-xml-parser'
import type { GpxInfo } from './GpxRouteMap.types';
import type { RoutePoint } from './GpxRouteMap.types';
import * as L from 'leaflet'

import { ERR_GEOLOCATION_NOT_AVAILABLE, ERR_GEOLOCATION_NOT_RESOLVED } from './useRouteRecorder';
import type { GpxData } from '../../../types/Gpx.types';

const parseGpxString = (gpx: string) => {
    let result;

    try {
        const parser = new XMLParser({
            ignoreAttributes: false,
            isArray: (tagName: string) => (tagName === 'trkpt')
          });
          result = parser.parse(gpx)
    } catch(e) {
      result = { gpx: { wpt: [] } };
      console.error(e);
    }

    return result
}

const getGpxInfo = (leafletEventTarget: L.GPX): GpxInfo => {
    return {
        distance: leafletEventTarget.get_distance(),
        time: leafletEventTarget.get_total_time(),
        movingTime: leafletEventTarget.get_total_time(),
        speed: leafletEventTarget.get_total_speed(),
        elevationMin: leafletEventTarget.get_elevation_min(),
        elevationMax: leafletEventTarget.get_elevation_max(),
    }
}

const getRoutePoint = (jObj: GpxData): RoutePoint => {
    let lat = 0, lon = 0

    if (jObj.gpx.trk && jObj.gpx.trk.trkseg && jObj.gpx.trk.trkseg.trkpt[0]) {
        lat = Number(jObj.gpx.trk.trkseg.trkpt[0]['@_lat']);
        lon = Number(jObj.gpx.trk.trkseg.trkpt[0]['@_lon']);
    } else if (jObj.gpx && jObj.gpx.wpt) {
      lat = Number(jObj.gpx.wpt[0]['@_lat']);
      lon = Number(jObj.gpx.wpt[0]['@_lon']);
    }

    return {
        lat: lat,
        lon: lon,
      }
}

const getGeolocationPosition = (okCallback: (position: GeolocationPosition) => void, 
    koCallback: (error: number) => void) => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(okCallback, () => { koCallback(ERR_GEOLOCATION_NOT_RESOLVED) });
    } else {
      koCallback(ERR_GEOLOCATION_NOT_AVAILABLE);
    }
  }

const getFitBoundsFromPosition = (point: GeolocationPosition): L.LatLngBoundsExpression => {
    const coords = point.coords;

    return [[coords.latitude - 0.3, coords.longitude - 0.3],[coords.latitude + 0.3, coords.longitude + 0.3]];
}

export { parseGpxString, getGpxInfo, getRoutePoint, getGeolocationPosition, getFitBoundsFromPosition };
