import type { GeoPoint } from "@/types/Route.types";

interface SimpleMapProps {
    id: string,
    containerClassName?: string,
    className?: string,
    width?: string,
    height?: string ,
    point: GeoPoint,
    zoomScale: number
}


export type { SimpleMapProps };