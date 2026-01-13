import * as React from 'react'
import useMapPointPicker from './hooks/UseMapPointPicker'
import type { MapPointPickerProps } from './MapPointPicker.types';

function MapPointPicker({ onMapClick, points, className }: MapPointPickerProps):React.JSX.Element {
    useMapPointPicker(onMapClick, points);

    return <div className="w-full h-full mb-5">
        <div id="mappicker" title='mapPointPicker' className={`rounded-xl shadow-xl ${className}`}></div>
    </div>

}

export default MapPointPicker