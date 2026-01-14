import type React from "react";
import type { Route } from "../../../../types/Route.types";

type RoutesCardListProps = {
  card: (route: Route) => React.ReactElement,
  routes: Array<Route>,
  infiniteScroll?: boolean
}

export type { RoutesCardListProps };