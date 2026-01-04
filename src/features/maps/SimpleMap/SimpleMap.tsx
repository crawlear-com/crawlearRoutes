import * as React from 'react'
import useSimpleMap from './hooks/useSimpleMap';
import type { SimpleMapProps } from './SimpleMap.types';

function SimpleMap({ id, point, className, width, height }: SimpleMapProps):React.JSX.Element {
    useSimpleMap(id, point);

    return <div className={ className } >
        <div id={`map${id}`} className={`rounded-2xl ${width} ${height} -z-50`}></div>
    </div>

}

export default SimpleMap;