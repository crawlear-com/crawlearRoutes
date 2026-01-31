import type { MapPoint } from "../SearchRouteMap/SearchRouteMap.types"

const POINT = "point";
const AREA = "area";

type MapPointPickerProps = {
    onMapClick?: (searchBounds: L.LatLngBounds) => void,
    points?: Array<MapPoint>,
    className?: string
}

type MarkerList = {
    selectors: Array<L.Layer>
    marker11: Array<L.Layer>,
    marker110: Array<L.Layer>,
    marker118: Array<L.Layer>,
    marker124: Array<L.Layer>,
}

export type { MapPointPickerProps, MarkerList}
export { POINT, AREA };
