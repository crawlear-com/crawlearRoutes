import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useEventsCalendar from "./hooks/useEventsCalendar";

import './styles/eventsCalendar.css';

const EventsCalendar = () => {
  const [ startDate, eventRoutes, onEventClick, onDateRangeChange, onDayClick,
    renderEventContent ] = useEventsCalendar();

  return (<FullCalendar plugins={[ dayGridPlugin ]}
      initialDate={ startDate } eventClick={ onEventClick } navLinkDayClick={ onDayClick }
      eventContent={ renderEventContent } navLinks={ true }
      height="100%"
      initialView="dayGridMonth" events={ eventRoutes } datesSet={ onDateRangeChange} />);
}

export default EventsCalendar;