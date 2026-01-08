import * as React from 'react'
import * as L from 'leaflet'
import 'leaflet-gpx'
import { parseGpxString, getGpxInfo, getRoutePoint, getGeolocationPosition, getFitBoundsFromPosition } from '../helpers/Utils'

import type { RoutePoint, GpxInfo } from '../GpxRouteMap.types'
import type { GeoPoint } from '../../../../types/Route.types'
import { ERR_GEOLOCATION_NOT_RESOLVED } from './useRouteRecorder'
import GpxInfoCard from '../GpxInfoCard/GpxInfoCard'

const ARROUND_BARCELONA: L.LatLngBoundsExpression = [[41.29, 1.70], [41.79, 2.30]]

const gpxParserOptions = {
    async: true,
    marker_options: {
      wptIconUrls: { '': '../assers/images/marker-icon.png' },
      startIconUrl: '../assers/images/marker-icon-start.png',
      endIconUrl: '../assers/images/marker-icon-end.png',
      shadowUrl: '../assers/images/marker-shadow.png'
    }
}

const useGpxRouteMap = (onFileResolved?: (fileContent: string, routePoint: GeoPoint) => void, gpx?: string):
  [(fileContents: string) => void, React.JSX.Element, boolean, React.Dispatch<React.SetStateAction<boolean>>,
     number, React.Dispatch<React.SetStateAction<number>>] => {
  
  const map = React.useRef<L.Map | null>(null)
  const [extraGpxInfo, setExtraGpxInfo] = React.useState<React.JSX.Element>(<></>)
  const [recordState, setRecordState] = React.useState(false)
  const [error, setError] = React.useState<number>(0)
  const onFileLoaded = React.useCallback((fileContents: string) => {
    const generateInfoPopUp = (gpxInfo: GpxInfo): React.JSX.Element => {
      return <GpxInfoCard gpxInfo={ gpxInfo } />
    }
      try {
        const jObj = parseGpxString(fileContents)
        const onLoadedHandler = (e: L.LeafletEvent) => {
            const routePoint: RoutePoint = getRoutePoint(jObj)
            const gpxInfo = getGpxInfo(e.target)

            setExtraGpxInfo(generateInfoPopUp(gpxInfo))
            map.current?.fitBounds(e.target.getBounds())
            if (onFileResolved) {
              onFileResolved(fileContents, routePoint);
            }
        }
        new L.GPX(fileContents, gpxParserOptions).on('loaded', onLoadedHandler).addTo(map.current!)

      } catch(e: unknown) {
        if (onFileResolved) {
          onFileResolved('', {
            lat: 0,
            lon: 0
          });
        }

        console.error(e);
      }
    }, [onFileResolved]);

    const setMapLocation = (point?: GeolocationPosition) => {
      let bounds;

      if (point) {
        bounds = getFitBoundsFromPosition(point);
      } else {
        bounds = ARROUND_BARCELONA;
      }
  
      if(!map.current) {
        map.current = L.map('map').fitBounds(bounds);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19 
        }).addTo(map.current)
      }
    }

    React.useEffect(() => {
      getGeolocationPosition(setMapLocation, () => { 
        setError(ERR_GEOLOCATION_NOT_RESOLVED);
        setMapLocation();
      });

      return () => {
        map.current?.off()
        map.current?.remove()
      }
    }, []);

    React.useEffect(() => {
      if (gpx && gpx.length && (gpx.indexOf('<trkpt')>0 || gpx.indexOf('<wpt')>0)) {
        onFileLoaded(gpx)
      }
    }, [gpx, onFileLoaded])

    return [onFileLoaded, extraGpxInfo, recordState, setRecordState, error, setError]
}



export default useGpxRouteMap
