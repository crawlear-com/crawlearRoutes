import type { MapPoint } from "../SearchRouteMap/SearchRouteMap.types"

type MapPointPickerProps = {
    onMapClick?: (searchBounds: L.LatLngBounds) => void,
    points?: Array<MapPoint>,
    className?: string
}

export type { MapPointPickerProps };
