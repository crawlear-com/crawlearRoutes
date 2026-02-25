import * as React from 'react'
import * as L from 'leaflet'
import 'leaflet-gpx'
import { iconRoute } from '../Icons'
import type { GeoPoint } from '@/domain/Route.types'
import useCssLoad from '../../hooks/usCssLoad'

const getBoundingBox = (zoomScale: number, lat: number, lon : number): [[number, number],[number, number]] => {
  return [[lat - zoomScale, lon - zoomScale], [lat + zoomScale, lon + zoomScale]];
}

function useSimpleMap(id: string, point: GeoPoint, zoomScale: number): void {
    const map = React.useRef<L.Map | null>(null);
    useCssLoad();

    const addPropsPoints = React.useCallback(() => {
      if (point) {
          L.marker(new L.LatLng(point.lat, point.lon), { icon: iconRoute }).addTo(map.current!);
      }
    }, [point]);

    React.useEffect(() => {
      const newMap = L.map(`map${id}`, {attributionControl: false}).fitBounds(getBoundingBox(zoomScale, point.lat, point.lon));

      newMap.zoomControl.remove();
      newMap.scrollWheelZoom.disable();
      newMap.dragging.disable();
      newMap.doubleClickZoom.disable();
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(newMap);
      map.current = newMap;
      
      return () => {
        newMap.off();
        newMap.remove();
      }
    }, [id, point, zoomScale]);

    React.useEffect(() => {
      addPropsPoints();
    }, [point, addPropsPoints]);
  }

export default useSimpleMap;
