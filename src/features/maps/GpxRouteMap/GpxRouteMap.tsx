import * as React from 'react'
import useGpxRouteMap from './hooks/useGpxRouteMap'
//import useWakeLock from './useWakeLock'
import RecButton from './RecButton/RecButton'

import 'leaflet/dist/leaflet.css'
import FileLoader from './FileLoader/FileLoader'
import type { GpxRouteMapProps } from './GpxRouteMap.types'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import GpxInfoCard from './GpxInfoCard/GpxInfoCard'

function GpxRouteMap ({ gpx, onFileResolved, onRouteRecorded, className }: GpxRouteMapProps): React.JSX.Element {
  const { t } = useTranslation(['map']);
  const [onFileLoaded, onStartStopRecord, onPause, onPollingTimeChanged, gpxInfo, 
    recordState, pauseState, error, pollingTime ] = useGpxRouteMap(onFileResolved, gpx, onRouteRecorded);
  //const [requestWakeLock, releaseWakeLock] = useWakeLock(onError);

  React.useEffect(() => {
    if (error!==0) {
      toast.error(t(`errors.error_${error}`));
    }
  }, [error, t]);

  return <div className="max-w-[90%] lg:max-w-2/3 mx-auto flex gap-5">
        <div id="map" title='routeMap' className={`${className} rounded-xl h-132`}></div>
        <GpxInfoCard gpxInfo={ gpxInfo } className={`${className}` } />
        { (onFileResolved || onRouteRecorded) && <div className="flex flex-col sm:flex-row justify-center mt-5">
          { onFileResolved && <FileLoader onFileLoaded={onFileLoaded}></FileLoader> }
          { onRouteRecorded && <> <RecButton onStartStopRecord={ onStartStopRecord }
              onPause={ onPause } recordState={ recordState } pauseState={ pauseState }
              onPollingTimeChange={ onPollingTimeChanged } value={ pollingTime } />
          </> }
        </div> }
      </div>
}

export default GpxRouteMap
