import * as React from 'react'
import 'leaflet-gpx'
import * as L from 'leaflet'
import { iconRoute } from '../Icons'
import type { GeoPoint } from '../../../../types/Route.types'
import type { MapPoint } from '../../SearchRouteMap/SearchRouteMap.types'
import { addMarkersListMapPoint, addRectangleAndGetBounds, buildAndAddLegendToMap,
  getCleanMarkersList, fitMapToBounds, getMax, getMin, getNewMap, initialMarkersList,
  removePreviousMarkersFromMap } from '../helpers/utils'
import type { MarkerList } from '../MapPointPicker.types'

const useMapPointPicker = (onMapClick?: (searchBounds: L.LatLngBounds) => void, points?: Array<MapPoint>) => {
    const markersList = React.useRef<MarkerList>(initialMarkersList);
    const layerControl = React.useRef<L.Control.Layers>(null);
    const map = React.useRef<L.Map | null>(null);

    React.useEffect(() => {
      const mapClickHandler = (e: L.LeafletMouseEvent) => {
        const mapBounds = map.current?.getBounds();
        if (mapBounds && map.current) {
          const { rectangle, searchBounds } = addRectangleAndGetBounds(map.current, e.latlng, mapBounds);
          removePreviousMarkersFromMap(markersList.current, layerControl.current, true);
          markersList.current = getCleanMarkersList([]);

          markersList.current.selectors.push(rectangle);
          if (map.current && onMapClick) {
            onMapClick(searchBounds);
          }
        }
      }
      
      map.current = getNewMap('mappicker', mapClickHandler);

      return () => {
        if (map.current) {
          map.current.off()
          map.current.remove()
        }
      }
    }, [onMapClick]);
    
    const addPropsPointsToMap = React.useCallback((setBounds: boolean = false) => {
      let max: GeoPoint = { lat: -90, lon: -180 }
      let min: GeoPoint = { lat: 90, lon: 180 }

      removePreviousMarkersFromMap(markersList.current, layerControl.current, false);
      markersList.current = getCleanMarkersList(markersList.current.selectors);

      if (points && points.length > 0) {
        points.forEach((popPoint) => {
          addMarkersListMapPoint(markersList.current, popPoint, iconRoute);
          max = getMax(popPoint.point, max);
          min = getMin(popPoint.point, min);
        });

        if (setBounds && map.current) {
          fitMapToBounds(map.current, min, max);
        }

        if (map.current) {
          layerControl.current = buildAndAddLegendToMap(map.current, markersList.current);
        }
      }
    }, [points]);

    React.useEffect(() => {
      addPropsPointsToMap(true);
    }, [points, addPropsPointsToMap])
}

export default useMapPointPicker
