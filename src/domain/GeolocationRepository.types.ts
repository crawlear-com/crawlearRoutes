interface IGeolocationRepository {
  getGeolocation: (okCallback: (position: GeolocationPosition) => void,
    koCallback: (error: number) => void) => void;
}

export type { IGeolocationRepository };