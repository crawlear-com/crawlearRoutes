import * as React from 'react'
import useMapPointPicker from './hooks/useMapPointPicker';

interface MapPointPickerProps {
    id: string,
    className?: string,
    width?: number,
    height?: number,
    point: GeoPoint
}

export interface GeoPoint {
    lat: number,
    lon: number
}

function MapPointPicker({ id, point, className, width, height }: MapPointPickerProps):React.JSX.Element {
    useMapPointPicker(id, point);

    return <div className={ className } >
        <div id={`map${id}`} className={`rounded-2xl w-[${width}rem] h-[${height}rem]`}></div>
    </div>

}

export default MapPointPicker