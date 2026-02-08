import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import useEventsCalendar from "./hooks/useEventsCalendar";
import Spinner from "@/application/components/ui/Spinner/Spinner";

import './styles/eventsCalendar.css';

const EventsCalendar = () => {
  const [ isLoading, currentDate, eventRoutes, eventRouteEvents, onEventClick, 
    onDateRangeChange, onDayClick, onEventDrop, renderEventContent ] = useEventsCalendar();

  return (<div className="container z-10 self-start">
      { isLoading ? <Spinner /> : <FullCalendar plugins={[ interactionPlugin, dayGridPlugin ]} 
      selectable={ true }
      editable={ true }
      eventDrop={ onEventDrop }
      initialDate={ currentDate } eventClick={ onEventClick } navLinkDayClick={ onDayClick }
      eventContent={ renderEventContent } navLinks={ true } height="auto"
      initialView="dayGridMonth" events={ [...eventRoutes, ...eventRouteEvents] }
      datesSet={ onDateRangeChange} /> }
    </div>);
}

export default EventsCalendar;