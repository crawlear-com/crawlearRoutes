import type { Route } from "../../../../types/Route.types";
import type { RouteEvent } from "../../../../types/RouteEvent.types";

type EventsListState = {
  routes: Array<Route>,
  routeEvents: Array<RouteEvent>,
  startDate: string,
  endDate: string,
  isLoading: boolean,
  error: string | null
}

const getDate15DaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 15);

  return date;
}

const getDate15DaysFrom = () => {
  const date = new Date();
  date.setDate(date.getDate() + 15);

  return date;
}

const initialState: EventsListState = {
  routes: [],
  routeEvents: [],
  startDate: getDate15DaysAgo().toISOString(),
  endDate: getDate15DaysFrom().toISOString(),
  isLoading: false,
  error: null
};

export { type EventsListState, initialState };