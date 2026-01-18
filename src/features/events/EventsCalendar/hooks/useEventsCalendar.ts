import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEventRoutes, setEndDate, setStartDate } from "../../store/slices/eventListsSlice";
import type { AppDispatch } from "../../../../store/store";
import { selectEventRoutes, selectEventStartDate } from "../../store/selectors/eventsListsSelectors";
import type { Route } from "../../../../types/Route.types";
import type { DatesSetArg, EventClickArg } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";

type CalendarEventRoutes = {
  id: string,
  title: string,
  start: Date,
  end: Date
}

const datePlus1h = (date: string) => {
  const origDate = new Date(date);
  
  origDate.setHours(origDate.getHours()+1);
  return origDate;

}

const useEventsCalendar = (): [
    string, Array<CalendarEventRoutes>, (info: EventClickArg) => void, (arg: DatesSetArg) => void
  ] => {
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
          end: datePlus1h(route.created_at!),
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

  return [ startDate, eventRoutes, onEventClick, onDateRangeChange ];
}

export default useEventsCalendar;