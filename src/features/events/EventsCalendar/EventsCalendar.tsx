import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useEventsCalendar from "./hooks/useEventsCalendar";

const EventsCalendar = () => {
  const [ startDate, eventRoutes, onEventClick, onDateRangeChange ] = useEventsCalendar();

  return (<>
    <FullCalendar plugins={[ dayGridPlugin ]}
      initialDate={ startDate } eventClick={ onEventClick }
      initialView="dayGridMonth" events={ eventRoutes } datesSet={ onDateRangeChange} />
  </>);
}

export default EventsCalendar;