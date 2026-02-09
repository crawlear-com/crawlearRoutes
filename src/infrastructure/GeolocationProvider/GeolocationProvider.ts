import type { IGeolocationRepository } from "@/domain/GeolocationRepository.types";

class GeolocationProvider {
  private repository: IGeolocationRepository;

  constructor(repository: IGeolocationRepository) {
    this.repository = repository;
  }

  getGeolocation(okCallback: (position: GeolocationPosition) => void,
    koCallback: (error: number) => void) {
      this.repository.getGeolocation(okCallback, koCallback);
  }
}

export default GeolocationProvider;