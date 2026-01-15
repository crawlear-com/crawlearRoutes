import type React from "react";
import type { Route, SearchResultRoute } from "../../../../types/Route.types";

type RoutesCardListProps = {
  card: (route: (Route | SearchResultRoute)) => React.ReactElement,
  routes: Array<Route> | Array<SearchResultRoute>,
  infiniteScroll?: boolean
}

export type { RoutesCardListProps };