import type React from "react";
import type { Route } from "../../../types/Route.types";

type RoutesListProps = {
  card: (route: Route) => React.ReactElement,
  totalRoutes: number,
  routes: Array<Route>
}

export type { RoutesListProps };