import type { RouteEvent } from "../../../../types/RouteEvent.types";

type EventsListState = {
  events: Array<RouteEvent>,
  page: number,
  orderBy: string,
  orderDir: string,
  query: string,
  totalEvents: number
  isLoading: boolean,
  error: string | null
}

const initialState: EventsListState = {
  events: [],
  page: 0,
  orderBy: 'name',
  orderDir: 'asc',
  query: '',
  totalEvents: 0,
  isLoading: false,
  error: null
};

export { type EventsListState, initialState };