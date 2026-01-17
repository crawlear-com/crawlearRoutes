import L from "leaflet"
import type { GeoPoint } from "../../../../types/Route.types"
import type { MarkerList } from "../MapPointPicker.types";
import type { MapPoint } from "../../SearchRouteMap/SearchRouteMap.types";
import { SCALE11, SCALE110, SCALE118, SCALE124 } from "../../../../helpers/utils";

const ARROUND_BARCELONA: L.LatLngBoundsExpression = [[41.29, 1.70], [41.79, 2.30]]
const LATLON_MODIFIER = 0.05;
const initialMarkersList = {
  selectors: [],
  marker11: [],
  marker110: [],
  marker118: [],
  marker124: []
}

const isCircle = (marker: L.Layer) => {
  return (typeof marker.getPopup() === 'undefined');
}

const removeMarker = (marker: L.Layer, removeCircle: boolean) => {
  const markIsCircle = isCircle(marker);

  if(removeCircle && markIsCircle || !markIsCircle) {
    marker.remove()
  }
}

const getMin = (p1: GeoPoint, p2: GeoPoint) => {
  if(p1.lat < p2.lat) {
    p2.lat = p1.lat
  }
  if (p1.lon < p2.lon) {
    p2.lon = p1.lon
  }
  return p2
}

const getMax = (p1: GeoPoint, p2: GeoPoint) => {
  if(p1.lat > p2.lat) {
    p2.lat = p1.lat;
  }
  if(p1.lon > p2.lon) {
    p2.lon = p1.lon;
  }
  return p2
}

const getSearchBoundsFromPoint = (point: L.LatLng, mapBounds: L.LatLngBounds): L.LatLngBounds => {
  const north = mapBounds.getNorth();
  const south = mapBounds.getSouth();
  const west = mapBounds.getWest();
  const east = mapBounds.getEast();

  const latModifier = (north - south) / 3;
  const lngModifier = (east - west) / 3;
  const southWest = [point.lat - latModifier, point.lng - lngModifier] as L.LatLngTuple;
  const northEast = [point.lat + latModifier, point.lng + lngModifier] as L.LatLngTuple;
  
  return new L.LatLngBounds(southWest, northEast);
} 

const getCleanMarkersList = (selectors: Array<L.Layer>) => {
  return {
    selectors: selectors || [],
    marker11: [],
    marker110: [],
    marker118: [],
    marker124: []
  };
};

const addRectangleAndGetBounds = (map: L.Map, point: L.LatLng, mapBounds: L.LatLngBounds ) => {
  const searchBounds = getSearchBoundsFromPoint(point, mapBounds);
  const rectangle = L.rectangle(searchBounds, {
    color: "#333333", weight: 1
  }).addTo(map);

  return { rectangle, searchBounds };
};

const getNewMap = (mapId: string, mapClickEventHandler: (e: L.LeafletMouseEvent) => void) => {
  const newMap = L.map(mapId).fitBounds(ARROUND_BARCELONA)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(newMap);
  newMap.on('click', (e: L.LeafletMouseEvent) => {
    mapClickEventHandler(e);
  });

  return newMap;
}

const addMarkersListMapPoint = (markersList: MarkerList, mapPoint: MapPoint, icon: L.Icon) => {
  const popup = L.popup().setContent(`<a href="#/route/${mapPoint.content.rid}"}>${mapPoint.content.name}</a>`);

  if (mapPoint.type === SCALE11) {
    markersList.marker11.push(L.marker([mapPoint.point.lat, mapPoint.point.lon],
      { icon: icon }).bindPopup(popup).openPopup());
  } else if (mapPoint.type === SCALE110) {
    markersList.marker110.push(L.marker([mapPoint.point.lat, mapPoint.point.lon],
      { icon: icon }).bindPopup(popup).openPopup());
  } else if (mapPoint.type === SCALE118) {
    markersList.marker118.push(L.marker([mapPoint.point.lat, mapPoint.point.lon],
      { icon: icon }).bindPopup(popup).openPopup());
  } else if (mapPoint.type === SCALE124) {
    markersList.marker124.push(L.marker([mapPoint.point.lat, mapPoint.point.lon],
      { icon: icon }).bindPopup(popup).openPopup());
  }
}

const buildAndAddLegendToMap = (map: L.Map, markersList: MarkerList) => {
  const layer1 = L.layerGroup(markersList.marker11);
  const layer2 = L.layerGroup(markersList.marker110);
  const layer3 = L.layerGroup(markersList.marker118);
  const layer4 = L.layerGroup(markersList.marker124);

  map.addLayer(layer1);
  map.addLayer(layer2);
  map.addLayer(layer3);
  map.addLayer(layer4);

  const overlay = { 
    "4x4": layer1,
    "1/10": layer2,
    "1/18": layer3,
    "1/24": layer4
  }
  return L.control.layers({}, overlay).addTo(map);
}

const fitMapToBounds = (map: L.Map, minPoint: GeoPoint, maxPoint: GeoPoint) => {
  map.fitBounds(new L.LatLngBounds([
    new L.LatLng(minPoint.lat - LATLON_MODIFIER, minPoint.lon - LATLON_MODIFIER), 
    new L.LatLng(maxPoint.lat + LATLON_MODIFIER, maxPoint.lon + LATLON_MODIFIER)
  ]));
}

const removePreviousMarkersFromMap = (markersList: MarkerList, layerControl: L.Control.Layers | null, removeCircle: boolean) => {
  Object.values(markersList).forEach((markers) => {
    markers.forEach((marker) => {
      removeMarker(marker, removeCircle);
    });
  });
  if (layerControl) {
    layerControl.remove();
  }
}


export { ARROUND_BARCELONA, LATLON_MODIFIER, initialMarkersList, getMin, getMax, getSearchBoundsFromPoint,
  removeMarker, getCleanMarkersList, addRectangleAndGetBounds, getNewMap, addMarkersListMapPoint,
  buildAndAddLegendToMap, fitMapToBounds, removePreviousMarkersFromMap };