import * as React from 'react'
//import { useTranslation } from "react-i18next"

//import '../../css/FileLoader.scss'

interface FileLoaderProps {
    onFileLoaded: (fileContents: string) => void
}

function  FileLoader({ onFileLoaded }: FileLoaderProps) {
    //const { t } = useTranslation('gpxRouteMap')
    const fileSelectRef = React.useRef(null)
    const fileElemRef = React.useRef(null)

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
        <button className="button-primary w-auto" ref={fileSelectRef} title="buttonInputFile"  id="fileSelect" type="button"> Upload </button>
    </>
}

export default FileLoader