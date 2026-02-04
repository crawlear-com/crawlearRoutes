import React from "react";
import { useSelector } from "react-redux";
import type { Route } from "@/types/Route.types";
import type { DatesSetArg, EventClickArg, EventContentArg, EventDropArg } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";
import { TYPE_EVENT, TYPE_ROUTE, type CalendarEventRoutes } from "../EventsCalendar.types";
import { getCalendarDataFrom } from "../helpers/utils";
import type { RouteEvent } from "@/types/RouteEvent.types";
import { getEventRouteEventsByMonth, getEventRoutesByMonth, setEventStartDate } from "@/database/eventsRpc";
import { selectUserUUID } from "@/features/users/store/selectors/userSelectors";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useEventsCalendar = (): [ boolean, string, Array<CalendarEventRoutes>,
    Array<CalendarEventRoutes>, (info: EventClickArg) => void, (arg: DatesSetArg) => void,
    (date: Date) => void, (dropInfo: EventDropArg) => void, (eventContent: EventContentArg) => void ] => {
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
    const getRoutes = async () => {
      setIsLoading(true);
      const response = await getEventRoutesByMonth(uid!, startDate!, endDate!);

      if (!response.error) {
        setIsLoading(false);
        return response;
      } else {
        setIsLoading(false);
        throw new Error(`${t("errors.error loading routes")}: ${response.error.message}`);
      }
    }

    const getEventRoutes = async () => {
      setIsLoading(true);
      const response = await getEventRouteEventsByMonth(uid!, startDate!, endDate!);

      if (!response.error) {
        setIsLoading(false);
        return response;
      } else {
        setIsLoading(false);
        throw new Error(`${t("errors.error loading events")}: ${response.error.message}`);
      }
    }

    if (uid && startDate && endDate) {      
      getRoutes().then((routes) => {
        setRoutes(routes);
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });

      getEventRoutes().then((routeEvents) => {
        setRouteEvents(routeEvents);
      }).catch((e: unknown) => {
        toast.error((e as Error).message);
      });
    }


  }, [startDate, endDate, uid, t]);

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
    const response = await setEventStartDate(eid!, startDate);

    if (!response.error) {
      return response;
    } else {
      throw new Error(`${"error.error modify date"}: ${response.error.message}`);
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