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
  location: GeoPoint,
  scale: number,
  youtubeVideo: string | null,
  gpx: string | null,
  durationTime: number,
  distance: number
}

type Route = CreationRoute & {
  id: string,
  created_at?: string,
  owner?: string
}

type SearchResultRoute = Route & {
  liked: boolean
}

export type { GeoPoint, Route, CreationRoute, SearchResultRoute };