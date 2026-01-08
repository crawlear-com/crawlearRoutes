import * as React from 'react'
import { useTranslation } from "react-i18next"

interface FileLoaderProps {
    onFileLoaded: (fileContents: string) => void
}

function  FileLoader({ onFileLoaded }: FileLoaderProps) {
    const { t } = useTranslation('map');
    const fileSelectRef = React.useRef(null);
    const fileElemRef = React.useRef(null);

    React.useEffect(() => {
        if (fileSelectRef.current) {
            (fileSelectRef.current as HTMLButtonElement).addEventListener('click', () => {
                if (fileElemRef.current) {
                    (fileElemRef.current as HTMLButtonElement).click();
                }
            }, false);
            if (fileElemRef.current) {
                (fileElemRef.current as HTMLInputElement).addEventListener('change', (e: Event) => {
                    const file = (e?.target as HTMLInputElement).files?.[0]
                    const fr = new FileReader()

                    fr.onload = () => {
                        onFileLoaded(fr.result?.toString() || '');
                    }
                    if (file) {
                        fr.readAsText(file);
                    }
                });
            }
        }

    }, [onFileLoaded])

    return <>
        <input ref={fileElemRef} title="inputFile" type="file" id="fileElem" multiple accept=".gpx" style={{ display: 'none' }} />
        <button className="ml-2 sm:ml-0 mr-2 button-primary w-auto sm:h-10" ref={fileSelectRef} title="buttonInputFile"  id="fileSelect" type="button">
            { t("main.upload") }
        </button>
    </>
}

export default FileLoader