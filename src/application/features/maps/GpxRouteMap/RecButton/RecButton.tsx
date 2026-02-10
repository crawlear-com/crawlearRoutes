import { useTranslation } from 'react-i18next'
import useRecButton from './hooks/useRecButton'
import type { GpxRecorderProps } from './RecButton.types';

const RecButton = ({ value, recordState, pauseState, onStartStopRecord, onPause,
    onPollingTimeChange}: GpxRecorderProps) => {
    const { t } = useTranslation(['map']);
    const [ readOnlyStatus, onInputValueChange ] = useRecButton(recordState, onPollingTimeChange);

    return <div className="flex-2 sm:text-right mt-2 sm:mt-0 self-center">
        { recordState ? 
            <button id="pauseButton" onClick={ onPause } className={`inline mr-2 button-primary w-auto h-10`}>
                { pauseState ? t('main.paused') : t('main.pause') }
            </button>
            :<></>
        }
        <button id="recButton" className={`mr-2 button-danger w-auto h-10`} 
            onClick={ onStartStopRecord }> { recordState ? t('main.stop') : t('main.rec') }
        </button>
        <span className=''>{ t('main.polling time') }</span>
        <input className='m-auto text-right mx-1' type="number" min="5" max="120"
            { ...readOnlyStatus } value={ value } onChange={ onInputValueChange } />
        <span className='m-auto'>{ t('main.secs') }</span>
    </div>
}

export default RecButton