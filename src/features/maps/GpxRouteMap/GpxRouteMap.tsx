import * as React from 'react'
import useGpxRouteMap from './hooks/useGpxRouteMap'
//import useWakeLock from './useWakeLock'
import RecButton from './RecButton/RecButton'

import 'leaflet/dist/leaflet.css'
import FileLoader from './FileLoader'
import type { GpxRouteMapProps } from './GpxRouteMap.types'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

function GpxRouteMap ({ gpx, onFileResolved, onRouteRecorded, className }: GpxRouteMapProps): React.JSX.Element {
  const { t } = useTranslation(['map']);
  const [onFileLoaded, onStartStopRecord, onPause, onPollingTimeChanged, extraGpxInfo, 
    recordState, pauseState, error, pollingTime ] = useGpxRouteMap(onFileResolved, gpx, onRouteRecorded);
  //const [requestWakeLock, releaseWakeLock] = useWakeLock(onError);

  React.useEffect(() => {
    if (error!==0) {
      toast.error(t(`errors.error_${error}`));
    }
  }, [error, t]);

  return <div className="w-full h-full flex flex-col">
        <div id="map" title='routeMap' className={`${className} rounded-xl`}></div>
        { extraGpxInfo }
        <div className="flex flex-col sm:flex-row justify-center mt-5">
          { onFileResolved && <FileLoader onFileLoaded={onFileLoaded}></FileLoader> }
          { onRouteRecorded && <>
            <RecButton onStartStopRecord={ onStartStopRecord } onPause={ onPause } 
              recordState={ recordState } pauseState={ pauseState }
              onPollingTimeChange={ onPollingTimeChanged } value={ pollingTime } />
          </> }
        </div>
      </div>
}

export default GpxRouteMap
