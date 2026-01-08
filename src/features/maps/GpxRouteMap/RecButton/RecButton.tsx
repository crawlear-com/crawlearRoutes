import * as React from 'react'
import { useTranslation } from 'react-i18next'
import useRecButton from './hooks/useRecButton'

interface GpxRecorderProps {
    value: number
    onStartStopRecord: React.MouseEventHandler<HTMLButtonElement>
    recordState: boolean
    onPollingTimeChange: (value: number) => void
}

function RecButton({ value, onStartStopRecord, recordState, onPollingTimeChange}: GpxRecorderProps) {
    const { t } = useTranslation(['map']);
    const [ readOnlyStatus, onInputValueChange ] = useRecButton(recordState, onPollingTimeChange);

    return <div className=''>
        <button id="recButton" className={`inline mr-2 button-primary w-auto h-10`} 
            onClick={ onStartStopRecord }> { recordState ? t('main.stop') : t('main.rec') }
        </button>
        <span className=''>{ t('main.polling time') }</span>
        <input className='m-auto text-right border border-primary rounded mx-1' type="number" min="14" max="120" 
            { ...readOnlyStatus } value={ value } onChange={ onInputValueChange } />
        <span className='m-auto'>{ t('main.secs') }</span>
    </div>
}

export default RecButton