import { createSelector } from "@reduxjs/toolkit";

const selectEventRoutes = createSelector(
  (state) => state.events.calendarEvents,
  (events) => events.routes
);

const selectEventRouteEvents = createSelector(
  (state) => state.events.calendarEvents,
  (events) => events.routeEvents
);

const selectEventStartDate = createSelector(
  (state) => state.events.calendarEvents,
  (events) => events.startDate
);

const selectEventEndDate = createSelector(
  (state) => state.events.calendarEvents,
  (events) => events.endDate
);

const selectMyEvents = createSelector(
  (state) => state.events.myEvents,
  (myEvents) => myEvents.allEventRoutes
);

const selectMyEventsIsLoading = createSelector(
  (state) => state.events,
  (events) => events.isLoading
);

const selectMyEventsPage = createSelector(
  (state) => state.events.myEvents,
  (myEvents) => myEvents.page
);

const selectMyEventsTotalRoutes = createSelector(
  (state) => state.events.myEvents,
  (myEvents) => myEvents.totalEvents
);

export { selectEventRoutes, selectEventStartDate, selectEventEndDate, selectEventRouteEvents,
  selectMyEvents, selectMyEventsIsLoading, selectMyEventsPage, selectMyEventsTotalRoutes
 };