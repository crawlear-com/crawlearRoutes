import type { GeoPoint } from "../../../types/Route.types";

interface SimpleMapProps {
    id: string,
    className?: string,
    width?: string,
    height?: string ,
    point: GeoPoint
}


export type { SimpleMapProps };