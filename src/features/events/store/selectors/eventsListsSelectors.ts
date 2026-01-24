import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

const selectMyEvents = createSelector(
  (state: RootState) => state.events,
  (events) => events.events
);

const selectMyEventsIsLoading = createSelector(
  (state: RootState) => state.events,
  (events) => events.isLoading
);

const selectMyEventsPage = createSelector(
  (state: RootState) => state.events,
  (events) => events.page
);

const selectMyEventsTotalRoutes = createSelector(
  (state: RootState) => state.events,
  (events) => events.totalEvents
);

export { selectMyEvents, selectMyEventsIsLoading, selectMyEventsPage, selectMyEventsTotalRoutes };