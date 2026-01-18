import type { Route } from "../../../../types/Route.types";

type EventsListState = {
  routes: Array<Route>,
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
  startDate: getDate15DaysAgo().toISOString(),
  endDate: getDate15DaysFrom().toISOString(),
  isLoading: false,
  error: null
};

export { type EventsListState, initialState };