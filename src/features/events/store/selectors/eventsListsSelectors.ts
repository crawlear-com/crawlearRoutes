import { createSelector } from "@reduxjs/toolkit";

const selectMyEvents = createSelector(
  (state) => state.events,
  (events) => events.events
);

const selectMyEventsIsLoading = createSelector(
  (state) => state.events,
  (events) => events.isLoading
);

const selectMyEventsPage = createSelector(
  (state) => state.events,
  (events) => events.page
);

const selectMyEventsTotalRoutes = createSelector(
  (state) => state.events,
  (events) => events.totalEvents
);

export { selectMyEvents, selectMyEventsIsLoading, selectMyEventsPage, selectMyEventsTotalRoutes };