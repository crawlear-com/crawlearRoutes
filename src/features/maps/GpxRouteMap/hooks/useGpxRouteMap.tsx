import * as React from 'react'
import * as L from 'leaflet'
import 'leaflet-gpx'
import { parseGpxString, getGpxInfo, getRoutePoint, getGeolocationPosition, setMapLocation, createMap, removeMarkers } from '../helpers/Utils'

import type { GpxInfo } from '../GpxRouteMap.types'
import type { GeoPoint } from '../../../../types/Route.types'
import useRouteRecorder, { ERR_GEOLOCATION_NOT_RESOLVED } from './useRouteRecorder'
import GpxInfoCard from '../GpxInfoCard/GpxInfoCard'
import { setGpx } from '../../../routeCreation/store/slices/routeSlice'

const NO_ERROR = 0;

const gpxParserOptions = {
    async: true,
    marker_options: {
      wptIconUrls: { '': '../assers/images/marker-icon.png' },
      startIconUrl: '../assers/images/marker-icon-start.png',
      endIconUrl: '../assers/images/marker-icon-end.png',
      shadowUrl: '../assers/images/marker-shadow.png'
    }
}

const useGpxRouteMap = (onFileResolved?: (fileContent: string, routePoint: GeoPoint) => void, 
gpx?: string, onRouteRecorded?: (fileContent: string, routePoint: GeoPoint) => void):
  [ (fileContents: string) => void, (event: React.MouseEvent<HTMLButtonElement>) => void, 
    (event: React.MouseEvent<HTMLButtonElement>) => void, (value: number) => void,
    React.JSX.Element, boolean, boolean, number, number ] => {
  
  const map = React.useRef<L.Map | null>(null)
  const [extraGpxInfo, setExtraGpxInfo] = React.useState<React.JSX.Element>(<></>);
  const [recordState, setRecordState] = React.useState(false);
  const [pauseState, setPauseState] = React.useState(false);
  const [error, setError] = React.useState<number>(0);
  const [pollingTime, setPollingTime] = React.useState<number>(30);
  const [gpxRecorded, onStartStopClick] = useRouteRecorder(pollingTime, onError, gpx);
  //const [requestWakeLock, releaseWakeLock] = useWakeLock(onError);

  function onError(error: number) {
    setError(error)
    if(recordState) {
      setRecordState(false);
    }
    //releaseWakeLock();
  }

  const PauseOrReanudeRecord = (event: React.MouseEvent<HTMLButtonElement>) => {
    setError(NO_ERROR);
    onStartStopClick(event);
    if(recordState && onRouteRecorded && gpxRecorded && gpxRecorded.length && 
      (gpxRecorded.indexOf('<trkpt')>0 || gpxRecorded.indexOf('<wpt')>0)) {
        const jObj = parseGpxString(gpxRecorded);
        const routePoint = getRoutePoint(jObj);

        //releaseWakeLock();
        onRouteRecorded(gpxRecorded, routePoint);
    } else if (!recordState) {
      //requestWakeLock();
    }
  }

  const onPause = (event: React.MouseEvent<HTMLButtonElement>) => {
    PauseOrReanudeRecord(event);
    setPauseState(!pauseState);
  }

  const onStartStopRecord = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(!recordState) {
      setGpx("");
      setRecordState(!recordState);
      setPauseState(false);
      if (map.current) {
        removeMarkers(map.current);
      }
    } else {
      setRecordState(!recordState);
    }
    PauseOrReanudeRecord(event);
  }

  const onPollingTimeChanged = (value: number) => {
    setPollingTime(value);
  }
  const onFileLoaded = React.useCallback((fileContents: string) => {
    const generateInfoPopUp = (gpxInfo: GpxInfo): React.JSX.Element => {
      return <GpxInfoCard gpxInfo={ gpxInfo } />
    }
    try {
      if (map.current) {
        const jObj = parseGpxString(fileContents)
        const onLoadedHandler = (e: L.LeafletEvent) => {
            const routePoint: GeoPoint = getRoutePoint(jObj);
            const gpxInfo = getGpxInfo(e.target);

            setExtraGpxInfo(generateInfoPopUp(gpxInfo))
            map.current?.fitBounds(e.target.getBounds())
            if (onFileResolved) {
              onFileResolved(fileContents, routePoint);
            }
        }
        new L.GPX(fileContents, gpxParserOptions).on('loaded', onLoadedHandler).addTo(map.current!);
      }
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

  React.useEffect(() => {
    if (!map.current) {
      map.current = createMap('map');
    }
    getGeolocationPosition((point: GeolocationPosition) => setMapLocation(map.current!, point), () => { 
      setError(ERR_GEOLOCATION_NOT_RESOLVED);
      setMapLocation(map.current!);
    });
    return () => {
      map.current?.off();
      map.current?.remove();
      map.current = null;
    }
  }, []);

  React.useEffect(() => {
    if (gpxRecorded && gpxRecorded.length && (gpxRecorded.indexOf('<trkpt')>0 || gpxRecorded.indexOf('<wpt')>0)) {
      onFileLoaded(gpxRecorded);
    }
  }, [gpxRecorded, onFileLoaded]);

  return [ onFileLoaded, onStartStopRecord, onPause, onPollingTimeChanged, extraGpxInfo, 
    recordState, pauseState, error, pollingTime ];
}

export default useGpxRouteMap
