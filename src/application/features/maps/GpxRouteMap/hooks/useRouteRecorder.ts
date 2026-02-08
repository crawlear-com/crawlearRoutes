import * as React from 'react'
import { getGeolocationPosition, initialGpxDataString } from '../helpers/mapUtils'

export const ERR_GEOLOCATION_NOT_AVAILABLE = -1;
export const ERR_GEOLOCATION_NOT_RESOLVED = -2;

function useRouteRecorder(pollingTime: number, onError: (error: number) => void, previousGpxData?: string): 
[string, (isPause: boolean) => void] {
  const [timer, setTimer] = React.useState(0)
  const [gpxDataString, setGpxDataString] = React.useState(previousGpxData?.replace('</trkseg></trk></gpx>','') || initialGpxDataString)

  const clearTimer = () => {
    window.clearInterval(timer)
    setTimer(0)
  }

  const error = (error: number) => {
    onError(error)
    if (timer) {
      clearTimer()
    }
  }

  const success = (position: GeolocationPosition) => {
    setGpxDataString((previousData) => {
      return previousData.concat(`
        <trkpt lon="${position.coords.longitude}" lat="${position.coords.latitude}">
          <ele>${ position.coords.altitude ? position.coords.altitude : 0 }</ele>
          <time>${ new Date(position.timestamp).toISOString() }</time>
          <speed>${position.coords.speed ? position.coords.speed : 0 }</speed>
        </trkpt>`)
    })
  }

  const onStartStopClick = (isPause: boolean) => {
    if (timer) {
      clearTimer();
    } else {
      if (!isPause) {
        setGpxDataString(initialGpxDataString);
      }
      getGeolocationPosition(success, error);
      const newTimer = window.setInterval(() => {
        getGeolocationPosition(success, error);
      }, pollingTime * 1000);
      setTimer(newTimer);
    }
  }

  return [gpxDataString.concat('</trkseg></trk></gpx>'), onStartStopClick]
}

export default useRouteRecorder