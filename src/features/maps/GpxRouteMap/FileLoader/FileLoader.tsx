import type { FileLoaderProps } from './FileLoader.types';
import useFileLoader from './hooks/useFileLoader';

const  FileLoader = ({ onFileLoaded }: FileLoaderProps) => {
    const [ fileElemRef ] = useFileLoader(onFileLoaded);

    return <input className="self-center ml-2 sm:ml-0 mr-2 button-primary w-auto max-w-70 sm:max-w-100 sm:max-h-15"
        ref={ fileElemRef } title="inputFile" type="file" id="fileElem" multiple accept=".gpx" />
}

export default FileLoader