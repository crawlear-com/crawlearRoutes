import type { Route } from "../../../../types/Route.types";
import type { RouteEvent } from "../../../../types/RouteEvent.types";

type EventsListState = {
  calendarEvents: CalendarEvents,
  myEvents: {
    allEventRoutes: Array<RouteEvent>,
    page: number,
    orderBy: string,
    orderDir: string,
    query: string,
    totalEvents: number
  },
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

type CalendarEvents = {
  routes: Array<Route>,
  routeEvents: Array<RouteEvent>,
  startDate: string,
  endDate: string,
}

const initialState: EventsListState = {
  myEvents: {
    allEventRoutes: [],
    page: 0,
    orderBy: 'name',
    orderDir: 'asc',
    query: '',
    totalEvents: 0
  },
  calendarEvents: {
    routes: [],
    routeEvents: [],
    startDate: getDate15DaysAgo().toISOString(),
    endDate: getDate15DaysFrom().toISOString(),
  },
  isLoading: false,
  error: null
};

export { type EventsListState, initialState };