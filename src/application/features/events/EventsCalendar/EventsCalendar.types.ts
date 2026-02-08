const TYPE_EVENT = 'event';
const TYPE_ROUTE = 'route';

type CalendarEventRoutes = {
  id: string,
  title: string,
  start: Date,
  end: Date,
  type: string
}

export type { CalendarEventRoutes }
export { TYPE_EVENT, TYPE_ROUTE };