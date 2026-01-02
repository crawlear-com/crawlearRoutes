import type { Route } from "../../types/Route.types"

type RoutesDataFromProvider = {
  total_count: number,
  routes: Array<Route>,
  page: number,
  per_page: number
}

export type { RoutesDataFromProvider };