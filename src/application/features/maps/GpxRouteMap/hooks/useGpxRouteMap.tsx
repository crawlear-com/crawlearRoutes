import * as React from 'react'
import * as L from 'leaflet'
import 'leaflet-gpx'

import { parseGpxString, getGpxInfo, getRoutePoint, getGeolocationPosition,
  setMapLocation, createMap, removeMarkers, getGeolocationPositionFromGeoPoint,
  gpxHasPoints, 
  getElevationMapData,
  initialGpxInfo,
  NO_ERROR,
  gpxParserOptions} from '../helpers/mapUtils'

import type { GpxInfo } from '../GpxRouteMap.types'
import type { GeoPoint } from '@/domain/Route.types'
import useRouteRecorder, { ERR_GEOLOCATION_NOT_RESOLVED } from './useRouteRecorder'
import { setGpx } from '@/application/features/routeCreation/store/slices/routeSlice'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next';
import useWakeLock from './useWakeLock';

const useGpxRouteMap = (onFileResolved?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void, 
  gpx?: string, onRouteRecorded?: (fileContent: string, routePoint: GeoPoint, distance: number, duration: number) => void,
  onStopRecording?: () => void, onStartRecording?: () => void): [ (fileContents: string) => void, (event: React.MouseEvent<HTMLButtonElement>) => void, 
    (event: React.MouseEvent<HTMLButtonElement>) => void, (value: number) => void,
    GpxInfo, boolean, boolean, number ] => {
  const { t } = useTranslation(['map']);
  const map = React.useRef<L.Map | null>(null);
  const [ recordState, setRecordState ] = React.useState(false);
  const [ pauseState, setPauseState ] = React.useState(false);
  const [ error, setError ] = React.useState<number>(0);
  const [ pollingTime, setPollingTime ] = React.useState<number>(30);
  const [ gpxInfo, setGpxInfo ] = React.useState<GpxInfo>(initialGpxInfo);
  const [ gpxRecorded, onStartStopClick ] = useRouteRecorder(pollingTime, onError, gpx);
  const [requestWakeLock, releaseWakeLock] = useWakeLock(onError);

  function onError(error: number) {
    setError(error);
    if(recordState) {
      setRecordState(false);
    }
    releaseWakeLock();
  }

  const PauseOrReanudeRecord = () => {
    setError(NO_ERROR);
    onStartStopClick(false);
    if(recordState && onRouteRecorded && gpxRecorded && gpxRecorded.length && 
      (gpxRecorded.indexOf('<trkpt') > 0 || gpxRecorded.indexOf('<wpt') > 0)) {
        try {
          const jObj = parseGpxString(gpxRecorded);
          const routePoint = getRoutePoint(jObj);

          releaseWakeLock();
          onRouteRecorded(gpxRecorded, routePoint, gpxInfo.distance, gpxInfo.time);
        } catch(e: unknown) {
          toast.error(`${t("errors.cannot record")}: ${(e as Error).message}`);
        }
    } else if (!recordState) {
      requestWakeLock();
    }
  }

  const onPause = () => {
    onStartStopClick(true);
    setPauseState(!pauseState);
  }

  const onStartStopRecord = () => {
    if(!recordState) {
      setGpx("");
      setPauseState(false);
      if (map.current) {
        removeMarkers(map.current);
      }
    }
    setRecordState(!recordState);
    PauseOrReanudeRecord();
    if (recordState && onStopRecording) {
       onStopRecording();
    } else if (!recordState && onStartRecording) {
      onStartRecording();
    }
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
          toast.error(`${t("errors.cannot load")}: ${(e as Error).message}`);
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
  }, [onFileResolved, setGpxInfo, t]);

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

  React.useEffect(() => {
    if (error!==0) {
      toast.error(t(`errors.error_${error}`));
    }
  }, [error, t]);

  return [ onFileLoaded, onStartStopRecord, onPause, onPollingTimeChanged, 
    gpxInfo, recordState, pauseState, pollingTime ];
}

export default useGpxRouteMap
