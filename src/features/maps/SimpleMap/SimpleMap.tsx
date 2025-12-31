import * as React from 'react'
import useMapPointPicker from './hooks/useSimpleMap';
import type { SimpleMapProps } from './SimpleMap.types';

function SimpleMap({ id, point, className, width, height }: SimpleMapProps):React.JSX.Element {
    useMapPointPicker(id, point);

    return <div className={ className } >
        <div id={`map${id}`} className={`rounded-2xl ${width} ${height}`}></div>
    </div>

}

export default SimpleMap;