import type { Route, SearchResultRoute } from "@/domain/Route.types";

type RouteCardProps = {
  route: Route | SearchResultRoute,
  extras?: React.JSX.Element
}

export type { RouteCardProps };