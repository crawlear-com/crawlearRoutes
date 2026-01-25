import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useEventsCalendar from "./hooks/useEventsCalendar";
import Spinner from "@/components/ui/Spinner/Spinner";

import './styles/eventsCalendar.css';

const EventsCalendar = () => {
  const [ isLoading, currentDate, eventRoutes, eventRouteEvents, onEventClick, onDateRangeChange, onDayClick,
    renderEventContent ] = useEventsCalendar();

  return (<div className="card flex-1 p-10">{ isLoading ? <Spinner /> : <FullCalendar plugins={[ dayGridPlugin ]}
      initialDate={ currentDate } eventClick={ onEventClick } navLinkDayClick={ onDayClick }
      eventContent={ renderEventContent } navLinks={ true } height="auto"
      initialView="dayGridMonth" events={ [...eventRoutes, ...eventRouteEvents] }
      datesSet={ onDateRangeChange} /> }
    </div>);
}

export default EventsCalendar;