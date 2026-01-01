import type { Route } from "../../types/Route.types"

/*[
    {
        "total_count": 2,
        "routes": [
            {
                "id": "0e2322f8-2042-44af-8f67-7be0c6349cd3",
                "name": "Pont d’en Gatus - Molí de Sors",
                "likes": 12,
                "distance": 4,
                "location": {
                    "lat": 2.162015809337,
                    "lon": 41.443876121245
                },
                "difficulty": 2,
                "description": "Pequeña localización cerca de Centelles con un riachuelo y zona de piedras para ruta o trial. Buen grip. Zona variada en dificultad. Buena localización.",
                "durationTime": 300
            }
        ],
        "page": 1,
        "per_page": 1
    }
] */

type RoutesData = {
  total_count: number,
  routes: Array<Route>,
  page: number,
  per_page: number
}

export type { RoutesData };