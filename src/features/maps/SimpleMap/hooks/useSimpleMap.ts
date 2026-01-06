import * as React from 'react'
import * as L from 'leaflet'
import 'leaflet-gpx'
import { iconRoute } from '../Icons'
import type { GeoPoint } from '../../../../types/Route.types'

//const ARROUND_BARCELONA: L.LatLngBoundsExpression = [[41.29, 1.70], [41.79, 2.30]]

const getBoundingBox = (lat: number, lon : number): [[number, number],[number, number]] => {
  return [[lat - 1, lon - 1], [lat + 1, lon + 1]];
}

function useSimpleMap(id: string, point: GeoPoint): void {
    const map = React.useRef<L.Map | null>(null);

    const addPropsPoints = React.useCallback(() => {
      if (point) {
          L.marker(new L.LatLng(point.lat, point.lon), { icon: iconRoute }).addTo(map.current!);
      }
    }, [point]);

    React.useEffect(() => {
      const newMap = L.map(`map${id}`).fitBounds(getBoundingBox(point.lat, point.lon));

      newMap.zoomControl.remove();
      newMap.scrollWheelZoom.disable();
      newMap.dragging.disable();
      newMap.doubleClickZoom.disable();
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(newMap);
      map.current = newMap;
      
      return () => {
        newMap.off()
        newMap.remove()
      }
    }, [id]);

    React.useEffect(() => {
      addPropsPoints()
    }, [point, addPropsPoints])
  }

export default useSimpleMap;
