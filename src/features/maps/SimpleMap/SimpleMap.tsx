import * as React from 'react'
import useSimpleMap from './hooks/useSimpleMap';
import type { SimpleMapProps } from './SimpleMap.types';

function SimpleMap({ id, point, containerClassName, className, width, height, zoomScale }: SimpleMapProps):React.JSX.Element {
    useSimpleMap(id, point, zoomScale);

    return <div className={ containerClassName } >
        <div id={`map${id}`} className={`rounded-2xl ${className} ${width} ${height}`}></div>
    </div>

}

export default SimpleMap;