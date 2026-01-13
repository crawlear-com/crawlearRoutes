import * as React from 'react'
import 'leaflet-gpx'
import * as L from 'leaflet'
import { iconRoute } from '../Icons'
import type { GeoPoint } from '../../../../types/Route.types'
import type { MapPoint } from '../../SearchRouteMap/SearchRouteMap.types'
import { getMax, getMin, getSearchBoundsFromPoint } from '../helpers/utils'

const ARROUND_BARCELONA: L.LatLngBoundsExpression = [[41.29, 1.70], [41.79, 2.30]]
const LATLON_MODIFIER = 0.05;

const isCircle = (marker: L.Layer) => {
  return (typeof marker.getPopup() === 'undefined');
}

const useMapPointPicker = (onMapClick?: (searchBounds: L.LatLngBounds) => void, points?: Array<MapPoint>) => {
    const markers = React.useRef<Array<L.Layer>>([]);
    const map = React.useRef<L.Map | null>(null);
    const removePreviousMarkers = (removeCircle: boolean) => {
      markers.current.forEach((marker) => {
        const markIsCircle = isCircle(marker);

        if(removeCircle && markIsCircle || !markIsCircle) {
          marker.remove()
        }
      })
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
          markers.current = [];
          markers.current.push(rectangle);
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
          markers.current.push(L.marker([poppoint.point.lat, poppoint.point.lon],
            { icon: iconRoute }).bindPopup(poppoint.content).openPopup().addTo(map.current!))
          max = getMax(poppoint.point, max);
          min = getMin(poppoint.point, min);

          if (setBounds && map.current) {
            map.current.fitBounds(new L.LatLngBounds([
              new L.LatLng(min.lat - LATLON_MODIFIER, min.lon - LATLON_MODIFIER), 
              new L.LatLng(max.lat + LATLON_MODIFIER, max.lon + LATLON_MODIFIER)
            ]))
          }
        })
      }
    }, [points])

    React.useEffect(() => {
      addPropsPoints(true);
    }, [points, addPropsPoints])
}

export default useMapPointPicker
