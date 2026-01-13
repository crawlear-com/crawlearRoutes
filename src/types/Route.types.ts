type GeoPoint ={
  lat: number,
  lon: number
}

type CreationRoute = {
  name: string,
  description: string,
  difficulty: number,
  isPublic: boolean,
  likes: number,
  location: GeoPoint | null,
  scale: number,
  youtubeVideo?: string,
  gpx: string | null,
  durationTime: number,
  distance: number
}

type Route = CreationRoute & {
  id: string,
  created_at?: string,
  owner?: string
}

export type { GeoPoint, Route, CreationRoute };