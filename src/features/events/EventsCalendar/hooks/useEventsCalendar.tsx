import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEventRoutes, setEndDate, setStartDate } from "../../store/slices/eventListsSlice";
import type { AppDispatch } from "../../../../store/store";
import { selectEventRoutes, selectEventStartDate } from "../../store/selectors/eventsListsSelectors";
import type { Route } from "../../../../types/Route.types";
import type { DatesSetArg, EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";
import type { CalendarEventRoutes } from "../EventsCalendar.types";
import { datePlusHours } from "../helpers/utils";

const useEventsCalendar = (): [
    string, Array<CalendarEventRoutes>, (info: EventClickArg) => void, (arg: DatesSetArg) => void,
    (eventContent: EventContentArg) => void ] => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const startDate = useSelector(selectEventStartDate);
  //const endDate = useSelector(selectEventEndDate);
  const routes:Array<Route> = useSelector(selectEventRoutes);
  const [ eventRoutes, setEventRoutes ] = React.useState<Array<CalendarEventRoutes>>([]);

  React.useEffect(() => {
    dispatch(getMyEventRoutes());
  }, [dispatch]);

  React.useEffect(() => {
    if (routes.length > 0) {
      setEventRoutes(routes.map((route) => {
        return { id: route.id,
          title: route.name,
          start: new Date(route.created_at!),
          end: datePlusHours(route.created_at!, route.durationTime! / 1000 / 60 / 60)
        }
      }));
    }
  }, [routes]);

  const onEventClick = (info: EventClickArg) => {
    navigate(`/route/${info.event.id}`);
  }

  const onDateRangeChange = (param: DatesSetArg) => {
    dispatch(setStartDate(param.start.toISOString()));
    dispatch(setEndDate(param.end.toISOString()));
    dispatch(getMyEventRoutes());
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    const startTime = eventContent.event.start;
    return(<div className="rounded flex flex-col bg-secondary">
        <li>
          <b>{ `${startTime!.getHours()}:${startTime!.getMinutes()}`  }</b>
        </li>
        <i className="text-wrap font-bold max-h-10 text-ellipsis overflow-hidden cursor-pointer">
          { eventContent.event.title }
        </i>
        <b>{ eventContent.event.end?.getHours() }</b>
      </div>)
}

  return [ startDate, eventRoutes, onEventClick, onDateRangeChange, renderEventContent ];
}

export default useEventsCalendar;