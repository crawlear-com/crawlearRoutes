type GpxXmlData = {
  "@_version": string,
  "@_encoding": string,
  "@_standalone": string
}

type GpxTrk = {
  trkseg: GpxTrkSeg
}

type GpxTrkPt = {
  "@_lat": string,
  "@_lon": string,
  ele: number,
  speed: number
  time: number
}

type GpxTrkSeg = {
  trkpt: Array<GpxTrkPt>
}

type GpxWpt = {
  "@_lat": string,
  "@_lon": string,
  ele: number,
  magvar: number,  
  hdop: number,
  vdop: number,
  speed: number
}
type GpxGpxData = {
  "@_creator": string,
  "@_version": string,
  "@_xmlns": string, 
  "@_xmlns:xsi": string,
  "@_xsi:schemaLocation": string,
  trk?: GpxTrk,
  wpt?: Array<GpxWpt>
}

type GpxData = {
  "?xml": GpxXmlData,
  gpx: GpxGpxData
}

export type { GpxData };