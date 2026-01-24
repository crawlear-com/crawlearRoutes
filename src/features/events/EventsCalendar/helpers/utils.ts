import type { Route } from "../../../../types/Route.types";
import type { RouteEvent } from "../../../../types/RouteEvent.types";

const datePlusHours = (date: string, hours: number) => {
  const origDate = new Date(date);
  
  origDate.setHours(origDate.getHours() + hours);

  return origDate;
}

const getDate15DaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 15);

  return date.toISOString();
}

const getDate15DaysFrom = () => {
  const date = new Date();
  date.setDate(date.getDate() + 15);

  return date.toISOString();
}

const getCalendarDataFrom = (array: Array<Route | RouteEvent>, type: string) => {
  return array.map((item) => {
    const isRoute = 'created_at' in item;
    const startDate = isRoute ? (item as Route).created_at : (item as RouteEvent).date;
    
    return { id: item.id,
      title: item.name,
      start: new Date(startDate!),
      end: isRoute ? datePlusHours((item as Route).created_at!, (item as Route).durationTime! / 1000 / 60 / 60) : datePlusHours((item as RouteEvent).date, 4),
      type: type
    }
  });
}

export { datePlusHours, getDate15DaysAgo, getDate15DaysFrom, getCalendarDataFrom };