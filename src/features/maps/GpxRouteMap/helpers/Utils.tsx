import { XMLParser } from 'fast-xml-parser'
import type { GpxInfo } from '../GpxRouteMap.types';
import * as L from 'leaflet'

import { ERR_GEOLOCATION_NOT_AVAILABLE, ERR_GEOLOCATION_NOT_RESOLVED } from '../hooks/useRouteRecorder';
import type { GpxData } from '../../../../types/Gpx.types';
import type { GeoPoint } from '../../../../types/Route.types';
import GpxInfoCard from '../GpxInfoCard/GpxInfoCard';

const ARROUND_BARCELONA: L.LatLngBoundsExpression = [[41.29, 1.70], [41.79, 2.30]]

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

const generateInfoPopUp = (gpxInfo: GpxInfo): React.JSX.Element => {
  return <GpxInfoCard gpxInfo={ gpxInfo } />;
}

const getRoutePoint = (jObj: GpxData): GeoPoint => {
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

    return [[coords.latitude - 0.005, coords.longitude - 0.005],[coords.latitude + 0.005, coords.longitude + 0.005]];
}

const createMap = (id: string) => {
  return L.map(id);
}

const setMapLocation = (map: L.Map, point?: GeolocationPosition) => {
  let bounds;

  if (point) {
    bounds = getFitBoundsFromPosition(point);
  } else {
    bounds = ARROUND_BARCELONA;
  }

  map.fitBounds(bounds);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19 
  }).addTo(map)
}

const removeMarkers = (map: L.Map) => {
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        map.removeLayer(layer)
    }
  })
}

const getGeolocationPositionFromGeoPoint = (point: GeoPoint): GeolocationPosition => {
  return {
    coords: {
      latitude: point.lat,
      longitude: point.lon,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
      toJSON: () => { }
    },
    timestamp: Date.now(),
    toJSON: () => { }
  }
}

const gpxHasPoints = (gpx:string) => {
  return (gpx && gpx.length && (gpx.indexOf('<trkpt')>0 || gpx.indexOf('<wpt')>0));
}

export { parseGpxString, getGpxInfo, getRoutePoint, getGeolocationPosition, getGeolocationPositionFromGeoPoint,
  getFitBoundsFromPosition, createMap, setMapLocation, removeMarkers, generateInfoPopUp, gpxHasPoints };
