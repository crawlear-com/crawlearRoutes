import * as React from "react";

const useFileLoader = (onFileLoaded: (fileContents: string) => void): [  React.RefObject<null> ] => {
    const fileElemRef = React.useRef(null);

    React.useEffect(() => {
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
    }, [onFileLoaded]);

    return [ fileElemRef ];
}

export default useFileLoader;