import * as React from 'react'
const ERR_WAKELOCK_NOT_AVAILABLE = -3;

function useWakeLock(onError: (error: number)=> void): [() => void, () => void] {
    const [wakeLock, setWakeLock] = React.useState<WakeLockSentinel| null>(null)
    const requestWakeLock = async () => {
      try {
        const lock = await navigator.wakeLock.request('screen')

        lock.addEventListener('release', () => {
          setWakeLock(null)
        });
        setWakeLock(lock)
      } catch (err) {
        onError(ERR_WAKELOCK_NOT_AVAILABLE)
        console.error(err);
      }
    }

    function releaseWakeLock() {
      if(wakeLock) {
        wakeLock.release().then(() => setWakeLock(null));
      }
    }

    return [requestWakeLock, releaseWakeLock]
}

export default useWakeLock