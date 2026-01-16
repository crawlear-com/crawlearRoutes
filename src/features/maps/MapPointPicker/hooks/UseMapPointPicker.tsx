import * as React from 'react'
import 'leaflet-gpx'
import * as L from 'leaflet'
import { iconRoute } from '../Icons'
import type { GeoPoint } from '../../../../types/Route.types'
import type { MapPoint } from '../../SearchRouteMap/SearchRouteMap.types'
import { getMax, getMin, getSearchBoundsFromPoint } from '../helpers/utils'
import type { MarkerList } from '../MapPointPicker.types'
import { SCALE11, SCALE110, SCALE118, SCALE124 } from '../../../../helpers/utils'

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

const useMapPointPicker = (onMapClick?: (searchBounds: L.LatLngBounds) => void, points?: Array<MapPoint>) => {
    const markersList = React.useRef<MarkerList>(initialMarkersList);
    const layerControl = React.useRef<L.Control.Layers>(null);
    const map = React.useRef<L.Map | null>(null);
    const removePreviousMarkers = (removeCircle: boolean) => {
      Object.values(markersList.current).forEach((markers) => {
        markers.forEach((marker) => {
          removeMarker(marker, removeCircle);
        });
      });
      layerControl.current?.remove();
    }

    React.useEffect(() => {
      const mapClickHandler = (e: L.LeafletMouseEvent) => {
        const mapBounds = map.current?.getBounds();
        if (mapBounds) {
          const searchBounds = getSearchBoundsFromPoint(e.latlng, mapBounds);
          const rectangle = L.rectangle(searchBounds, {
            color: "#333333", weight: 1
          }).addTo(map.current!);
  
          removePreviousMarkers(true);
          markersList.current = initialMarkersList;
          markersList.current.selectors.push(rectangle);
          if (map.current && onMapClick) {
            onMapClick(searchBounds);
          }
        }
      }

      const newMap = L.map('mappicker').fitBounds(ARROUND_BARCELONA)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(newMap);
      newMap.on('click', (e: L.LeafletMouseEvent) => {
        mapClickHandler(e)
      });
      map.current = newMap;

      return () => {
        newMap.off()
        newMap.remove()
      }
    }, [onMapClick]);
    
    const addPropsPoints = React.useCallback((setBounds: boolean = false) => {
      let max: GeoPoint = { lat: -90, lon: -180 }
      let min: GeoPoint = { lat: 90, lon: 180 }

      removePreviousMarkers(false);
      if (points && points.length > 0) {
        points.forEach((poppoint) => {
          const popup = L.popup().setContent(`<a href="#/route/${poppoint.content.rid}"}>${poppoint.content.name}</a>`);

          if (poppoint.type === SCALE11) {
            markersList.current.marker11.push(L.marker([poppoint.point.lat, poppoint.point.lon],
              { icon: iconRoute }).bindPopup(popup).openPopup())
          } else if (poppoint.type === SCALE110) {
            markersList.current.marker110.push(L.marker([poppoint.point.lat, poppoint.point.lon],
              { icon: iconRoute }).bindPopup(popup).openPopup())
          } else if (poppoint.type === SCALE118) {
            markersList.current.marker118.push(L.marker([poppoint.point.lat, poppoint.point.lon],
              { icon: iconRoute }).bindPopup(popup).openPopup())
          } else if (poppoint.type === SCALE124) {
            markersList.current.marker124.push(L.marker([poppoint.point.lat, poppoint.point.lon],
              { icon: iconRoute }).bindPopup(popup).openPopup())
          }
          max = getMax(poppoint.point, max);
          min = getMin(poppoint.point, min);

          if (setBounds && map.current) {
            map.current.fitBounds(new L.LatLngBounds([
              new L.LatLng(min.lat - LATLON_MODIFIER, min.lon - LATLON_MODIFIER), 
              new L.LatLng(max.lat + LATLON_MODIFIER, max.lon + LATLON_MODIFIER)
            ]))
          }
        });

        const layer1 = L.layerGroup(markersList.current.marker11);
        const layer2 = L.layerGroup(markersList.current.marker110);
        const layer3 = L.layerGroup(markersList.current.marker118);
        const layer4 = L.layerGroup(markersList.current.marker124);
        const layerAll = L.layerGroup([...markersList.current.marker11,...markersList.current.marker110,
          ...markersList.current.marker118, ...markersList.current.marker124]);

        map.current?.addLayer(layer1);
        map.current?.addLayer(layer2);
        map.current?.addLayer(layer3);
        map.current?.addLayer(layer4);
        map.current?.addLayer(layerAll);

        const overlay = { 
          "1/1": layer1,
          "1/10": layer2,
          "1/18": layer3,
          "1/24": layer4,
          "All": layerAll
        }
        layerControl.current = L.control.layers(overlay).addTo(map.current!);
      }
    }, [points])

    React.useEffect(() => {
      addPropsPoints(true);
    }, [points, addPropsPoints])
}

export default useMapPointPicker
