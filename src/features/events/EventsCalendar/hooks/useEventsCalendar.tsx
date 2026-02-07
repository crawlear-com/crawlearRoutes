import React from "react";
import { useSelector } from "react-redux";
import type { Route } from "@/domain/Route.types";
import type { DatesSetArg, EventClickArg, EventContentArg, EventDropArg } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";
import { TYPE_EVENT, TYPE_ROUTE, type CalendarEventRoutes } from "../EventsCalendar.types";
import { getCalendarDataFrom } from "../helpers/utils";
import type { RouteEvent } from "@/domain/RouteEvent.types";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";
import RouteEventDataProvider from "@/infrastructure/DataProvider/RouteEventDataProvider/RouteEventDataProvider";

const useEventsCalendar = (): [ boolean, string, Array<CalendarEventRoutes>,
    Array<CalendarEventRoutes>, (info: EventClickArg) => void, (arg: DatesSetArg) => void,
    (date: Date) => void, (dropInfo: EventDropArg) => void, (eventContent: EventContentArg) => void ] => {
  const repository = React.useMemo(() => new SupabaseRouteEventRepository(), []);
  const provider = React.useMemo(() => new RouteEventDataProvider(repository), [repository]);
  const navigate = useNavigate();
  const { t } = useTranslation(["myEvents"]);
  const [ currentDate, setCurrentDate ] = React.useState<string | null>(null);
  const [ startDate, setStartDate ] = React.useState<string | null>(null);
  const [ endDate, setEndDate ] = React.useState<string | null>(null);
  const [ routes, setRoutes ] = React.useState<Array<Route>>([]);
  const [ routeEvents, setRouteEvents ] = React.useState<Array<RouteEvent>>([]);
  const [ eventRoutes, setEventRoutes ] = React.useState<Array<CalendarEventRoutes>>([]);
  const [ eventRouteEvents, setEventRouteEvents ] = React.useState<Array<CalendarEventRoutes>>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const uid = useSelector(selectUserUUID);

  React.useEffect(() => {
    if (uid && startDate && endDate) {
      setIsLoading(true);    
      provider.getEventRoutesByMonth(uid!, startDate!, endDate!).then((routes) => {
        setRoutes(routes);
        setIsLoading(false);
      }).catch((e: unknown) => {
        setIsLoading(false);
        toast.error((e as Error).message);
      });

      setIsLoading(true);    
      provider.getEventRouteEventsByMonth(uid!, startDate!, endDate!).then((routeEvents) => {
        setRouteEvents(routeEvents);
        setIsLoading(false);
      }).catch((e: unknown) => {
        setIsLoading(false);
        toast.error((e as Error).message);
      });
    }


  }, [startDate, endDate, uid, t, provider]);

  React.useEffect(() => {
    if (routes.length > 0) {
      setEventRoutes(getCalendarDataFrom(routes, TYPE_ROUTE));
    }

    if (routeEvents.length > 0) {
      setEventRouteEvents(getCalendarDataFrom(routeEvents, TYPE_EVENT));
    }
  }, [routes, routeEvents]);

  const onEventClick = (info: EventClickArg) => {
    if (info.event.extendedProps.type === TYPE_EVENT) {
      navigate(`/showevent/${info.event.id}`);
    } else if (info.event.extendedProps.type === TYPE_ROUTE) {
      navigate(`/showroute/${info.event.id}`);
    }
  }

  const onDayClick = (date: Date) => {
    navigate(`/event/${date.getTime()}`);
  }

  const onDateRangeChange = (param: DatesSetArg) => {
    setStartDate(param.start.toISOString());
    setEndDate(param.end.toISOString());
    setCurrentDate(param.view.calendar.getDate().toISOString());
  }

  const onEventDrop = (dropInfo: EventDropArg) => {
    if (dropInfo) {
      if (dropInfo.event.extendedProps.type !== TYPE_EVENT) {
        dropInfo.revert();
        toast.error(t("main.only route events drop"));
      } else {
        if (dropInfo.event.start) {
          modifyEventStartDate(dropInfo.event.id, dropInfo.event.start.toISOString());
          toast.success(t("main.event modified"));
        }
      }
    }
  } 

  const modifyEventStartDate = async (eid: string, startDate: string) => {
    try {
      provider.setEventStartDate(eid!, startDate);
    } catch(error: unknown) {
      throw new Error(`${"error.error modify date"}: ${(error as Error).message}`);
    }
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    const startTime = eventContent.event.start;
    return(<div className={`rounded flex flex-col ${eventContent.event.extendedProps.type === TYPE_ROUTE ? 'bg-secondary texr-font' : 'bg-primary text-white'} p-1`}>
        <li>
          <b>{ `${startTime!.getHours()}:${startTime!.getMinutes()}`  }</b>
        </li>
        <i className="text-wrap font-bold max-h-10 text-ellipsis overflow-hidden cursor-pointer">
          { eventContent.event.title }
        </i>
        <b>{ eventContent.event.end?.getHours() }</b>
      </div>)
  }

  return [ isLoading, currentDate || new Date().toISOString(), eventRoutes, eventRouteEvents,
    onEventClick, onDateRangeChange, onDayClick, onEventDrop, renderEventContent ];
}

export default useEventsCalendar;