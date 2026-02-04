import * as React from 'react';
import useGpxRouteMap from './hooks/useGpxRouteMap';
import RecButton from './RecButton/RecButton';

import 'leaflet/dist/leaflet.css';
import FileLoader from './FileLoader/FileLoader';
import type { GpxRouteMapProps } from './GpxRouteMap.types';
import GpxInfoCard from './GpxInfoCard/GpxInfoCard';

const GpxRouteMap = ({ gpx, onFileResolved, onRouteRecorded, onStopRecording, onStartRecording,
  containerClassName, mapClassName }: GpxRouteMapProps): React.JSX.Element => {
  const [onFileLoaded, onStartStopRecord, onPause, onPollingTimeChanged, gpxInfo, 
    recordState, pauseState, pollingTime ] = useGpxRouteMap(onFileResolved, gpx, onRouteRecorded, onStopRecording, onStartRecording);

  return <div className={`${containerClassName} flex gap-5 flex-wrap flex-col sm:flex-row`}>
        { (onFileResolved || onRouteRecorded) && <div className="flex flex-col lg:flex-row w-full justify-center mt-5">
          { onFileResolved && <FileLoader onFileLoaded={onFileLoaded}></FileLoader> }
          { onRouteRecorded && <> <RecButton onStartStopRecord={ onStartStopRecord }
              onPause={ onPause } recordState={ recordState } pauseState={ pauseState }
              onPollingTimeChange={ onPollingTimeChanged } value={ pollingTime } />
          </> }
        </div> }
        <div id="map" title='routeMap' className={`${mapClassName} rounded-xl h-144`}></div>
        <GpxInfoCard gpxInfo={ gpxInfo } className={`${mapClassName}` } />
      </div>
}

export default GpxRouteMap
