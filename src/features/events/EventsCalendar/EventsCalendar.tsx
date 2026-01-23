import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useEventsCalendar from "./hooks/useEventsCalendar";
import Spinner from "../../../components/Spinner/Spinner";

import './styles/eventsCalendar.css';

const EventsCalendar = () => {
  const [ isLoading, currentDate, eventRoutes, eventRouteEvents, onEventClick, onDateRangeChange, onDayClick,
    renderEventContent ] = useEventsCalendar();

  return (<>{ isLoading ? <Spinner /> : <FullCalendar plugins={[ dayGridPlugin ]}
      initialDate={ currentDate } eventClick={ onEventClick } navLinkDayClick={ onDayClick }
      eventContent={ renderEventContent } navLinks={ true } height="100%"
      initialView="dayGridMonth" events={ [...eventRoutes, ...eventRouteEvents] }
      datesSet={ onDateRangeChange} /> }
    </>);
}

export default EventsCalendar;