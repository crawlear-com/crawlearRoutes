
type GeoPoint ={
  lat: number,
  lon: number
}

type Route = {
  id: string,
  created_at?: string,
  name: string,
  descriprion: string,
  difficulty: number,
  isPublic: boolean,
  likes: number,
  location: GeoPoint,
  owner?: string,
  scale?: number,
  youtubeVideo?: string,
  gpx?: string,
  durationTime: number,
  distance: number
}

export type { GeoPoint, Route };