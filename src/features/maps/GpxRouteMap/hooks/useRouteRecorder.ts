import * as React from 'react'
import { getGeolocationPosition } from '../helpers/mapUtils'

const initialGpxDataString = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" creator="murbit GPX Tracker">
  <trk><trkseg>`;
export const ERR_GEOLOCATION_NOT_AVAILABLE = -1;
export const ERR_GEOLOCATION_NOT_RESOLVED = -2;

function useRouteRecorder(pollingTime: number, onError: (error: number) => void, previousGpxData?: string): [string, React.MouseEventHandler<HTMLButtonElement>] {
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

  function success(position: GeolocationPosition) {
    setGpxDataString((previousData) => {
      return previousData.concat(`
        <trkpt lon="${position.coords.longitude}" lat="${position.coords.latitude}">
          <ele>${ position.coords.altitude ? position.coords.altitude : 0 }</ele>
          <time>${ new Date(position.timestamp).toISOString() }</time>
          <speed>${position.coords.speed ? position.coords.speed : 0 }</speed>
        </trkpt>`)
    })
  }

  function onStartStopClick() {
    if (timer) {
      clearTimer();
    } else {
      setGpxDataString(initialGpxDataString);
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