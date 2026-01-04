import * as React from 'react'
//import { useTranslation } from 'react-i18next'

//import '../../css/RecButton.scss'

interface GpxRecorderProps {
    value: number
    onStartStopRecord: React.MouseEventHandler<HTMLButtonElement>
    recordState: boolean
    onPollingTimeChange: (value: number) => void
}

function RecButton({ value, onStartStopRecord, recordState, onPollingTimeChange}: GpxRecorderProps) {
    //const { t } = useTranslation('gpxRouteMap')
    const readOnlyStatus = recordState && { disabled: true }

    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number((e.target as HTMLInputElement).value)

        onPollingTimeChange(value)
    }

    return <div>
        <button id="recButton" className={`inline mr-2 button-primary w-10 h-10 recButton ${recordState ? 'Rec' : 'notRec'}`} onClick={onStartStopRecord}>Rec</button>
        <span>Polling time</span>
        <input className='m-auto text-right' type="number" min="14" max="120" {...readOnlyStatus} value={value} onChange={onValueChange} />
        <span className='m-auto'>secs</span>
    </div>
}

export default RecButton