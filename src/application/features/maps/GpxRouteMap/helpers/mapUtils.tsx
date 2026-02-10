import { XMLParser } from 'fast-xml-parser'
import * as L from 'leaflet'
import { isObjectEmpty } from '@/application/helpers/utils';
import { startIcon, endIcon, shadowIcon, markerIcon } from './Icons';
import type { GpxInfo } from '../GpxRouteMap.types';
import type { GpxData, GpxTrkPt } from '@/application/features/maps/GpxRouteMap/Gpx.types';
import type { GeoPoint } from '@/domain/Route.types';

const ARROUND_BARCELONA: L.LatLngBoundsExpression = [[41.29, 1.70], [41.79, 2.30]]
const NO_ERROR = 0;

const gpxParserOptions = {
    async: true,
    markers: {
      wptIconUrls: { '': markerIcon },
      startIcon: startIcon,
      endIcon: endIcon,
      shadowUrl: shadowIcon
    }
}

const initialGpxInfo = {
  distance: 0,
  time: 0,
  movingTime: 0,
  speed: 0,
  elevationMin: 0,
  elevationMax: 0
}

const parseGpxString = (gpx: string): GpxData => {
    let result;

    try {
        const parser = new XMLParser({
            ignoreAttributes: false,
            isArray: (tagName: string) => (tagName === 'trkpt')
          });
          result = parser.parse(gpx);

          if (isObjectEmpty(result)) {
            throw new Error('GPX data is empty');
          }
    } catch(e) {
      result = { gpx: { wpt: [] } };
      throw new Error(`Cannot parse GPX file: ${(e as Error).message}`)
    }

    return result;
}

const getGpxInfo = (leafletEventTarget: L.GPX): GpxInfo => {
    return {
        distance: leafletEventTarget.get_distance() || 0,
        time: leafletEventTarget.get_total_time() || 0,
        movingTime: leafletEventTarget.get_total_time() || 0,
        speed: leafletEventTarget.get_total_speed() || 0,
        elevationMin: leafletEventTarget.get_elevation_min() || 0,
        elevationMax: leafletEventTarget.get_elevation_max() || 0
    }
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

const getFitBoundsFromPosition = (point: GeolocationPosition): L.LatLngBoundsExpression => {
    const coords = point.coords;

    return [[coords.latitude - 0.0005, coords.longitude - 0.0005],[coords.latitude + 0.0005, coords.longitude + 0.0005]];
}

const createMap = (id: string) => {
  return L.map(id, {attributionControl: false});
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

const getElevationMapData = (gpx: string): Array<Array<number>> => {
    const gpxObject = parseGpxString(gpx);
    let sections: Array<GpxTrkPt> = [];
    const data: Array<Array<number>> = [];

    if (gpxObject && gpxObject.gpx) {
      if (gpxObject.gpx.trk) {
        sections = gpxObject.gpx.trk.trkseg.trkpt;
      }

      if (sections) {
        sections.forEach((element, index) => {
            data.push([index, Number(element.ele.toFixed(3))]);
        })
      }
    }
    return data
}

const initialGpxDataString = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" creator="murbit GPX Tracker">
  <trk><trkseg>`;


export { NO_ERROR, initialGpxInfo, gpxParserOptions, parseGpxString, getGpxInfo,
  getRoutePoint, getGeolocationPositionFromGeoPoint,
  getFitBoundsFromPosition, createMap, setMapLocation, removeMarkers, gpxHasPoints,
  getElevationMapData, initialGpxDataString };
