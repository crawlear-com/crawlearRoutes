import * as React from 'react'
import 'leaflet-gpx'
import * as L from 'leaflet'
import { iconRoute, circleMarkerAttribs } from '../Icons'
import type { GeoPoint } from '../../../../types/Route.types'
import type { PopopPoint } from '../MapPointPicker.types'
import { getMax, getMin } from '../helpers/utils'

const ARROUND_BARCELONA: L.LatLngBoundsExpression = [[41.29, 1.70], [41.79, 2.30]]
const RADIUS_SCALE = 50332.5;
const LATLON_MODIFIER = 0.45;

const isCircle = (marker: L.Layer) => {
  return (typeof marker.getPopup() === 'undefined');
}

const useMapPointPicker = (onMapClick?: (latlon: L.LatLng, mapBounds: L.LatLngBounds) => void, points?: Array<PopopPoint>) => {
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
      const mapClick = (e: L.LeafletMouseEvent) => {
        const bounds: L.LatLngBounds | undefined = map.current?.getBounds();
        if (bounds) {
          const latGrad = (bounds.getNorthEast().lat - bounds.getSouthWest().lat)
          removePreviousMarkers(true);
          markers.current = [];
          circleMarkerAttribs.radius = latGrad * RADIUS_SCALE;

          const circle = L.circle([e.latlng.lat, e.latlng.lng], circleMarkerAttribs).addTo(map.current!);
          markers.current.push(circle);

          if (map.current && onMapClick) {
            onMapClick(e.latlng, map.current.getBounds());
          }
        }
      }

      const newMap = L.map('mappicker').fitBounds(ARROUND_BARCELONA)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(newMap);
      newMap.on('click', (e: L.LeafletMouseEvent) => {
        mapClick(e)
      });
      map.current = newMap;

      return () => {
        newMap.off()
        newMap.remove()
      }
    }, [onMapClick])
    
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
            map.current.fitBounds(new L.LatLngBounds([new L.LatLng(min.lat - LATLON_MODIFIER,
              min.lon - LATLON_MODIFIER), 
              new L.LatLng(max.lat + LATLON_MODIFIER, max.lon + LATLON_MODIFIER)]))
          }
        })
      }
    }, [points])

    React.useEffect(() => {
      addPropsPoints(true);
    }, [points, addPropsPoints])
}

export default useMapPointPicker
