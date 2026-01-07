import type { Route } from "../../../types/Route.types";
import type { RoutesDataFromProvider } from "../../../database/hooks/RoutesDataFromProvider.types";

type RoutesListProps = {
  title?: string,
  card: (route: Route) => React.ReactElement,
  hook: (rpc: (uuid: string, page: number, order_by: string, order_dir: string, query: string) => Promise<RoutesDataFromProvider>) => [number, number, Array<Route>, boolean, (page: number) => void, (order: string) => void, (order: string) => void, (query: string) => void]
  rpc: (uuid: string, page: number, order_by: string, order_dir: string, query: string) => Promise<RoutesDataFromProvider>
}

export type { RoutesListProps };