import { useTranslation } from "react-i18next"
import type { FileLoaderProps } from './FileLoader.types';
import useFileLoader from './hooks/useFileLoader';

const  FileLoader = ({ onFileLoaded }: FileLoaderProps) => {
    const { t } = useTranslation('map');
    const [ fileElemRef, fileSelectRef ] = useFileLoader(onFileLoaded);

    return <>
        <input ref={ fileElemRef } title="inputFile" type="file" id="fileElem" multiple accept=".gpx" style={{ display: 'none' }} />
        <button className="ml-2 sm:ml-0 mr-2 button-primary w-auto sm:max-h-15 max-w-24" ref={ fileSelectRef } title="buttonInputFile"  id="fileSelect" type="button">
            { t("main.upload") }
        </button>
    </>
}

export default FileLoader