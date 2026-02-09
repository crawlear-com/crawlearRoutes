import type { IGeolocationRepository } from "@/domain/GeolocationRepository.types";

export const ERR_GEOLOCATION_NOT_AVAILABLE = -1;
export const ERR_GEOLOCATION_NOT_RESOLVED = -2;

class GeolocationRespository implements IGeolocationRepository {
  getGeolocation(okCallback: (position: GeolocationPosition) => void,
    koCallback: (error: number) => void) {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(okCallback, () => { koCallback(ERR_GEOLOCATION_NOT_RESOLVED) },
          { timeout: 2000, enableHighAccuracy: true }
      );
    } else {
      koCallback(ERR_GEOLOCATION_NOT_AVAILABLE);
    }
  }
}

export default GeolocationRespository;