import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEventRouteEvents, getMyEventRoutes, setEndDate, setStartDate } from "../../store/slices/eventListsSlice";
import type { AppDispatch } from "../../../../store/store";
import { selectEventRouteEvents, selectEventRoutes, selectEventStartDate } from "../../store/selectors/eventsListsSelectors";
import type { Route } from "../../../../types/Route.types";
import type { DatesSetArg, EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";
import { TYPE_EVENT, TYPE_ROUTE, type CalendarEventRoutes } from "../EventsCalendar.types";
import { datePlusHours } from "../helpers/utils";
import type { RouteEvent } from "../../../../types/RouteEvent.types";

const useEventsCalendar = (): [
    string, Array<CalendarEventRoutes>, Array<CalendarEventRoutes>, (info: EventClickArg) => void, (arg: DatesSetArg) => void,
    (date: Date) => void, (eventContent: EventContentArg) => void ] => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const startDate = useSelector(selectEventStartDate);
  //const endDate = useSelector(selectEventEndDate);
  const routes:Array<Route> = useSelector(selectEventRoutes);
  const routeEvents:Array<RouteEvent> = useSelector(selectEventRouteEvents);
  const [ eventRoutes, setEventRoutes ] = React.useState<Array<CalendarEventRoutes>>([]);
  const [ eventRouteEvents, setEventRouteEvents ] = React.useState<Array<CalendarEventRoutes>>([]);

  React.useEffect(() => {
    dispatch(getMyEventRoutes());
  }, [dispatch]);

  React.useEffect(() => {
    if (routes.length > 0) {
      setEventRoutes(routes.map((route) => {
        return { id: route.id,
          title: route.name,
          start: new Date(route.created_at!),
          end: datePlusHours(route.created_at!, route.durationTime! / 1000 / 60 / 60),
          type: TYPE_ROUTE
        }
      }));
    }

    if (routeEvents.length > 0) {
      setEventRouteEvents(routeEvents.map((routeEvent) => {
        const date = new Date(routeEvent.date);
        return { id: routeEvent.id,
          title: routeEvent.name,
          start: date,
          end: datePlusHours(date.toDateString(), 4),
          type: TYPE_EVENT
        }
      }));
    }
  }, [routes, routeEvents]);

  const onEventClick = (info: EventClickArg) => {
    navigate(`/route/${info.event.id}`);
  }

  const onDayClick = (date: Date) => {
    navigate(`/event/${date.getTime()}`);
  }

  const onDateRangeChange = (param: DatesSetArg) => {
    dispatch(setStartDate(param.start.toISOString()));
    dispatch(setEndDate(param.end.toISOString()));
    dispatch(getMyEventRoutes());
    dispatch(getMyEventRouteEvents());
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    const startTime = eventContent.event.start;
    return(<div className={`rounded flex flex-col ${eventContent.event.extendedProps.type === TYPE_ROUTE ? 'bg-secondary' : 'bg-primary'} p-1  `}>
        <li>
          <b>{ `${startTime!.getHours()}:${startTime!.getMinutes()}`  }</b>
        </li>
        <i className="text-wrap font-bold max-h-10 text-ellipsis overflow-hidden cursor-pointer">
          { eventContent.event.title }
        </i>
        <b>{ eventContent.event.end?.getHours() }</b>
      </div>)
}

  return [ startDate, eventRoutes, eventRouteEvents, onEventClick, onDateRangeChange, onDayClick, renderEventContent ];
}

export default useEventsCalendar;