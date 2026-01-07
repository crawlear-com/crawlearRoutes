import * as React from 'react'
import useGpxRouteMap from './hooks/useGpxRouteMap'
import useRouteRecorder from './hooks/useRouteRecorder'
//import useWakeLock from './useWakeLock'
import RecButton from './RecButton'
import { parseGpxString, getRoutePoint } from './helpers/Utils'

import 'leaflet/dist/leaflet.css'
import FileLoader from './FileLoader'
import type { GpxRouteMapProps } from './GpxRouteMap.types'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const NO_ERROR = 0;

function GpxRouteMap ({ gpx, onFileResolved, onRouteRecorded, className }: GpxRouteMapProps): React.JSX.Element {
  const { t } = useTranslation(['map']);
  const [pollingTime, setPollingTime] = React.useState<number>(30)
  const [gpxRecorded, onStartStopClick] = useRouteRecorder(pollingTime, onError, gpx)
  const [onFileLoaded, extraGpxInfo, recordState, setRecordState, error, setError] = useGpxRouteMap(onFileResolved, gpxRecorded)
  //const [requestWakeLock, releaseWakeLock] = useWakeLock(onError)

  function onError(error: number) {
    setError(error)
    if(recordState) {
      setRecordState(false);
    }
    //releaseWakeLock();
  }

  React.useEffect(() => {
    if (error!==0) {
      toast.error(t(`errors.error_${error}`))
    }
  }, [error, t]);

  function onStartStopRecord(event: React.MouseEvent<HTMLButtonElement>) {
    setError(NO_ERROR)
    setRecordState(!recordState)
    onStartStopClick(event)
    if(recordState && onRouteRecorded && gpxRecorded && gpxRecorded.length && (gpxRecorded.indexOf('<trkpt')>0 || gpxRecorded.indexOf('<wpt')>0)) {
      const jObj = parseGpxString(gpxRecorded)
      const routePoint = getRoutePoint(jObj)

      //releaseWakeLock()
      onRouteRecorded(gpxRecorded, routePoint)
    } else if (!recordState) {
      //requestWakeLock()
    }
  }

  function onPollingTimeChanged(value: number) {
    setPollingTime(value)
  }

  return <div className="w-full h-full">
        <div id="map" title='routeMap' className={`${className} rounded-xl`}></div>
        { extraGpxInfo }
        { onRouteRecorded && <>
          <RecButton onStartStopRecord={onStartStopRecord} recordState={recordState} onPollingTimeChange={onPollingTimeChanged} value={pollingTime} />
        </> }
        { onFileResolved && <FileLoader onFileLoaded={onFileLoaded}></FileLoader> }
      </div>
}

export default GpxRouteMap
