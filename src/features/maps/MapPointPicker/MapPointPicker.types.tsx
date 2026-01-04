import type { GeoPoint } from "../../../types/Route.types"

type PopopPoint = {
  point: GeoPoint,
  content: HTMLElement
}

type MapPointPickerProps = {
    onMapClick?: (latlon: L.LatLng, mapBounds: L.LatLngBounds) => void,
    points?: Array<PopopPoint>,
    className?: string
}

export type { PopopPoint, MapPointPickerProps };
