import * as React from 'react'
import * as L from 'leaflet'
import 'leaflet-gpx'
import { parseGpxString, getGpxInfo, getRoutePoint, getGeolocationPosition,
  setMapLocation, createMap, removeMarkers, getGeolocationPositionFromGeoPoint,
  gpxHasPoints, 
  getElevationMapData} from '../helpers/mapUtils'

import type { GpxInfo } from '../GpxRouteMap.types'
import type { GeoPoint } from '@/types/Route.types'
import useRouteRecorder, { ERR_GEOLOCATION_NOT_RESOLVED } from './useRouteRecorder'
import { setGpx } from '@/features/routeCreation/store/slices/routeSlice'
import toast from 'react-hot-toast'

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

const useGpxRouteMap = (onFileResolved?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void, 
gpx?: string, onRouteRecorded?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void):
  [ (fileContents: string) => void, (event: React.MouseEvent<HTMLButtonElement>) => void, 
    (event: React.MouseEvent<HTMLButtonElement>) => void, (value: number) => void,
    GpxInfo, boolean, boolean, number, number ] => {
  const initialGpxInfo = {
    distance: 0,
    time: 0,
    movingTime: 0,
    speed: 0,
    elevationMin: 0,
    elevationMax: 0
  }
  const map = React.useRef<L.Map | null>(null)
  const [ recordState, setRecordState ] = React.useState(false);
  const [ pauseState, setPauseState ] = React.useState(false);
  const [ error, setError ] = React.useState<number>(0);
  const [ pollingTime, setPollingTime ] = React.useState<number>(30);
  const [ gpxRecorded, onStartStopClick ] = useRouteRecorder(pollingTime, onError, gpx);
  const [ gpxInfo, setGpxInfo ] = React.useState<GpxInfo>(initialGpxInfo);
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
        try {
          const jObj = parseGpxString(gpxRecorded);
          const routePoint = getRoutePoint(jObj);

          //releaseWakeLock();
          onRouteRecorded(gpxRecorded, routePoint, gpxInfo.distance, gpxInfo.time);
        } catch(e: unknown) {
          toast.error(`Cannot record GPX file: ${(e as Error).message}`);
        }
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
    try {
      if (map.current) {
        try {
          const jObj = parseGpxString(fileContents);
          const onLoadedHandler = (e: L.LeafletEvent) => {
              const routePoint: GeoPoint = getRoutePoint(jObj);
              const gpxInfo = getGpxInfo(e.target);
              
              setGpxInfo(gpxInfo);
              gpxInfo.elevationData = getElevationMapData(fileContents);
              setMapLocation(map.current!, getGeolocationPositionFromGeoPoint(routePoint));
              if (onFileResolved) {
                onFileResolved(fileContents, routePoint, Math.round(gpxInfo.distance), Math.round(gpxInfo.time));
              }
          }

          new L.GPX(fileContents, gpxParserOptions).on('loaded', onLoadedHandler).addTo(map.current!);
        } catch(e: unknown) {
          toast.error(`Cannot load GPX file: ${(e as Error).message}`);
        }
      }
    } catch(e: unknown) {
      if (onFileResolved) {
        onFileResolved('', {
          lat: 0,
          lon: 0
        }, 0, 0);
      }
      console.error(e);
    }
  }, [onFileResolved, setGpxInfo]);

  React.useEffect(() => {
    if (!map.current) {
      map.current = createMap('map');
    }
    if (!gpxHasPoints(gpxRecorded)) {
      getGeolocationPosition((point: GeolocationPosition) => setMapLocation(map.current!, point), 
        () => { 
          setError(ERR_GEOLOCATION_NOT_RESOLVED);
          setMapLocation(map.current!);
        }
      );
    }
    
    return () => {
      map.current?.off();
      map.current?.remove();
      map.current = null;
    }
  }, [gpxRecorded]);

  React.useEffect(() => {
    if (gpxHasPoints(gpxRecorded)) {
      onFileLoaded(gpxRecorded);
    }
  }, [gpxRecorded, onFileLoaded]);

  return [ onFileLoaded, onStartStopRecord, onPause, onPollingTimeChanged, 
    gpxInfo, recordState, pauseState, error, pollingTime ];
}

export default useGpxRouteMap
